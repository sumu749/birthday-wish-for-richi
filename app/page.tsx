"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, Sparkles, Volume2, VolumeX, ArrowDown } from "lucide-react";
import confetti from "canvas-confetti";
import {
    photos,
    birthdayVideos,
    richiThings,
    littleMemories,
    friendshipMovie,
    emotionalTransition,
    birthdayLetter,
    finalSurprise,
} from "@/data/memories";

export default function Home() {
    const [started, setStarted] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [candlesBlown, setCandlesBlown] = useState(false);
    const [letterOpen, setLetterOpen] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const startSurprise = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0.35;

            audioRef.current.play().catch((error) => {
                console.log("Audio could not start:", error);
            });
        }

        setStarted(true);

        setTimeout(() => {
            document
                .getElementById("warning")
                ?.scrollIntoView({ behavior: "smooth" });
        }, 300);
    };

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isMuted) {
            audioRef.current.play();
            setIsMuted(false);
        } else {
            audioRef.current.pause();
            setIsMuted(true);
        }
    };

    const blowCandles = () => {
        if (candlesBlown) return;

        setCandlesBlown(true);

        confetti({
            particleCount: 180,
            spread: 100,
            origin: { y: 0.6 },
        });

        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.55 },
            });
        }, 400);
    };

    return (
        <main className="min-h-screen overflow-hidden bg-[#fff7fa]">
            {/* Music */}
            <audio ref={audioRef} loop>
                <source src="/music/birthday.m4a" type="audio/m4a" />
            </audio>

            {/* Music Control */}
            <AnimatePresence>
                {started && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        onClick={toggleMusic}
                        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-rose-200 bg-white/80 text-rose-400 shadow-lg backdrop-blur-md transition hover:scale-105"
                        aria-label="Toggle music"
                    >
                        {isMuted ? (
                            <VolumeX size={19} />
                        ) : (
                            <Volume2 size={19} />
                        )}
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Floating Hearts */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                {Array.from({ length: 15 }).map((_, index) => (
                    <motion.div
                        key={index}
                        className="absolute text-pink-300/40"
                        initial={{
                            x: `${(index * 37) % 100}vw`,
                            y: "110vh",
                            opacity: 0,
                        }}
                        animate={{
                            y: "-10vh",
                            opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                            duration: 8 + (index % 5),
                            delay: (index * 2) % 5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        <Heart size={12 + (index % 15)} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            {/* ================= HERO ================= */}

            <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
                <div className="absolute left-10 top-20">
                    <Sparkles className="text-pink-300" size={28} />
                </div>

                <div className="absolute bottom-24 right-10">
                    <Sparkles className="text-rose-300" size={22} />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 max-w-3xl text-center"
                >
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-5 text-sm font-medium uppercase tracking-[0.35em] text-rose-400"
                    >
                        A little surprise for
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: 0.5,
                            duration: 0.8,
                            type: "spring",
                        }}
                        className="font-playfair text-6xl font-bold text-[#6d3048] sm:text-7xl md:text-8xl"
                    >
                        Richi Fariha
                    </motion.h1>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 100 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        className="mx-auto my-7 h-0.5 bg-rose-300"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4 }}
                        className="mx-auto max-w-xl text-base leading-8 text-[#795565] sm:text-lg"
                    >
                        Three years of friendship, chaos, laughter, random
                        conversations...
                        <br />
                        <span className="font-medium text-rose-400">
                            and somehow, you still haven&apos;t gotten rid of
                            me.
                        </span>
                    </motion.p>

                    <motion.button
                        onClick={startSurprise}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 15px 40px rgba(214, 113, 143, 0.25)",
                        }}
                        whileTap={{ scale: 0.96 }}
                        className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#d97998] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition"
                    >
                        Open Your Surprise
                        <Heart size={17} fill="currentColor" />
                    </motion.button>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <ArrowDown className="text-rose-300" size={18} />
                </motion.div>
            </section>

            {/* ================= WARNING ================= */}

            <section
                id="warning"
                className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24"
            >
                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-2xl rounded-4xl border border-rose-100 bg-white/60 p-8 text-center shadow-[0_20px_80px_rgba(211,110,143,0.12)] backdrop-blur-xl sm:p-14"
                >
                    <motion.div
                        initial={{ rotate: -10, scale: 0.8 }}
                        whileInView={{ rotate: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-3xl"
                    >
                        ⚠️
                    </motion.div>

                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-rose-400">
                        Before you continue...
                    </p>

                    <h2 className="font-playfair text-4xl font-bold text-[#6d3048] sm:text-5xl">
                        A Little Warning
                    </h2>

                    <div className="mx-auto my-8 h-px w-20 bg-rose-200" />

                    <div className="space-y-3 text-sm leading-7 text-[#795565] sm:text-base">
                        <p>✦ 3 years of memories</p>
                        <p>✦ Excessive chaos</p>
                        <p>✦ Questionable decisions</p>
                        <p>✦ Way too many photos</p>
                        <p>✦ One very special girl</p>
                        <p>✦ And possibly some emotional damage</p>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 }}
                        className="mt-8 font-playfair text-xl italic text-rose-400"
                    >
                        Proceed anyway?
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.3 }}
                        className="mt-7"
                    >
                        <button
                            onClick={() =>
                                document
                                    .getElementById("memories")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="rounded-full bg-[#d97998] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition hover:scale-105"
                        >
                            YES, OBVIOUSLY 💗
                        </button>
                    </motion.div>
                </motion.div>
            </section>

            {/* Memory section */}
            <section
                id="memories"
                className="relative overflow-hidden bg-[#fff5f8] px-6 py-28 sm:px-10 lg:px-16"
            >
                {/* Soft background decoration */}
                <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-pink-200/30 blur-3xl" />
                <div className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl" />

                <div className="relative mx-auto max-w-7xl">
                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mx-auto mb-16 max-w-2xl text-center"
                    >
                        <div className="mb-4 flex items-center justify-center gap-2 text-pink-500">
                            <Sparkles size={18} />
                            <span className="text-xs font-medium uppercase tracking-[0.35em]">
                                Chapter One
                            </span>
                            <Sparkles size={18} />
                        </div>

                        <h2 className="font-playfair text-4xl font-semibold text-rose-950 sm:text-5xl md:text-6xl">
                            Three Years of Us
                        </h2>

                        <p className="mt-5 text-base leading-7 text-rose-900/65 sm:text-lg">
                            Three years of friendship, countless memories,
                            random conversations, laughter, and way too many
                            pictures.
                        </p>

                        <p className="mt-4 font-playfair text-lg italic text-pink-500">
                            Somehow, we made it this far. ♡
                        </p>
                    </motion.div>

                    {/* Photo Gallery */}
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {photos.map((photo, index) => {
                            const rotations = [-3, 2, -2, 3, -1, 2];

                            return (
                                <motion.div
                                    key={photo}
                                    initial={{
                                        opacity: 0,
                                        y: 50,
                                        rotate: rotations[
                                            index % rotations.length
                                        ],
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        rotate: rotations[
                                            index % rotations.length
                                        ],
                                    }}
                                    whileHover={{
                                        scale: 1.04,
                                        rotate: 0,
                                        y: -8,
                                        zIndex: 10,
                                    }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: (index % 3) * 0.08,
                                    }}
                                    className="group relative"
                                >
                                    {/* Tape */}
                                    <div className="absolute -top-3 left-1/2 z-20 h-7 w-20 -translate-x-1/2 -rotate-3 bg-pink-200/70 shadow-sm" />

                                    {/* Polaroid */}
                                    <div className="rounded-sm bg-white p-3 pb-6 shadow-xl shadow-rose-200/30">
                                        <div className="relative aspect-4/3 overflow-hidden rounded-sm bg-rose-100">
                                            <Image
                                                src={photo}
                                                alt={`Richi memory ${index + 1}`}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                            />

                                            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-rose-950/15 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                                        </div>

                                        <div className="flex items-center justify-between px-1 pt-4">
                                            <div className="flex items-center gap-2 text-pink-400">
                                                <Heart
                                                    size={13}
                                                    fill="currentColor"
                                                />

                                                <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
                                                    Memory{" "}
                                                    {String(index + 1).padStart(
                                                        2,
                                                        "0",
                                                    )}
                                                </span>
                                            </div>

                                            <Sparkles
                                                size={14}
                                                className="text-pink-300 opacity-0 transition group-hover:opacity-100"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Ending */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mt-20 text-center"
                    >
                        <Heart
                            size={20}
                            fill="currentColor"
                            className="mx-auto mb-4 text-pink-400"
                        />

                        <p className="font-playfair text-2xl italic text-rose-900/70">
                            And these are just a few of them...
                        </p>

                        <p className="mt-3 text-sm text-rose-900/45">
                            Three years. Twenty-six pictures. A million little
                            moments.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Birthday Chaos */}

            <section
                id="birthday-chaos"
                className="relative overflow-hidden bg-rose-950 px-6 py-28 text-white sm:px-10 lg:px-16"
            >
                {/* Background decorations */}
                <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-pink-500/20 blur-3xl" />
                <div className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />

                <div className="relative mx-auto max-w-6xl">
                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mx-auto mb-16 max-w-2xl text-center"
                    >
                        <div className="mb-5 flex items-center justify-center gap-2 text-pink-300">
                            <Sparkles size={18} />
                            <span className="text-xs font-medium uppercase tracking-[0.35em]">
                                Chapter Two
                            </span>
                            <Sparkles size={18} />
                        </div>

                        <h2 className="font-playfair text-4xl font-semibold sm:text-5xl md:text-6xl">
                            Okay... Enough Emotions.
                        </h2>

                        <p className="mt-5 text-base leading-7 text-pink-100/70 sm:text-lg">
                            You thought this was going to be a serious birthday
                            website?
                        </p>

                        <p className="mt-3 font-playfair text-2xl italic text-pink-300">
                            Absolutely not. 😂
                        </p>
                    </motion.div>

                    {/* Funny intro */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="mx-auto mb-14 max-w-xl rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
                    >
                        <p className="text-sm leading-6 text-pink-100/70">
                            Because apparently saying “Happy Birthday” once
                            wasn&apos;t enough. So here are some completely
                            necessary birthday wishes.
                        </p>

                        <p className="mt-3 text-xs uppercase tracking-[0.25em] text-pink-300">
                            Warning: May cause uncontrollable laughing
                        </p>
                    </motion.div>

                    {/* Videos */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {birthdayVideos.map((video, index) => (
                            <motion.div
                                key={video.src}
                                initial={{
                                    opacity: 0,
                                    y: 50,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.7,
                                    delay: index * 0.1,
                                }}
                                whileHover={{
                                    y: -8,
                                }}
                                className="group"
                            >
                                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-sm transition duration-500 group-hover:border-pink-300/30">
                                    <div className="relative overflow-hidden rounded-2xl bg-black">
                                        <video
                                            src={video.src}
                                            controls
                                            playsInline
                                            preload="metadata"
                                            className="aspect-video w-full object-cover"
                                        />
                                    </div>

                                    <div className="px-3 pb-3 pt-5">
                                        <div className="mb-2 flex items-center gap-2 text-pink-300">
                                            <Heart
                                                size={13}
                                                fill="currentColor"
                                            />

                                            <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
                                                Birthday Wish{" "}
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0",
                                                )}
                                            </span>
                                        </div>

                                        <p className="font-playfair text-xl italic text-pink-50/90">
                                            {video.caption}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom joke */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="mt-20 text-center"
                    >
                        <p className="text-sm text-pink-100/50">
                            Still not enough?
                        </p>

                        <p className="mt-2 font-playfair text-2xl italic text-pink-300">
                            Don&apos;t worry. I have more embarrassing things
                            planned.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Things That Make Richi... */}

            <section
                id="richi-things"
                className="relative overflow-hidden bg-[#fff5f8] px-6 py-28 sm:px-10 lg:px-16"
            >
                {/* Background */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200/20 blur-3xl" />

                <div className="relative mx-auto max-w-6xl">
                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mx-auto mb-16 max-w-2xl text-center"
                    >
                        <div className="mb-4 flex items-center justify-center gap-2 text-pink-500">
                            <Sparkles size={18} />

                            <span className="text-xs font-medium uppercase tracking-[0.35em]">
                                Chapter Three
                            </span>

                            <Sparkles size={18} />
                        </div>

                        <h2 className="font-playfair text-4xl font-semibold text-rose-950 sm:text-5xl md:text-6xl">
                            Things That Make Richi...
                        </h2>

                        <h3 className="mt-2 font-playfair text-3xl italic text-pink-500 sm:text-4xl">
                            Richi.
                        </h3>

                        <p className="mt-6 text-base leading-7 text-rose-900/60 sm:text-lg">
                            Because honestly, there is no normal way to describe
                            you.
                        </p>
                    </motion.div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {richiThings.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{
                                        opacity: 0,
                                        y: 40,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                        amount: 0.2,
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.08,
                                    }}
                                    whileHover={{
                                        y: -10,
                                        rotate: index % 2 === 0 ? 1 : -1,
                                        scale: 1.03,
                                    }}
                                    className="group cursor-default"
                                >
                                    <div className="relative h-full overflow-hidden rounded-3xl border border-pink-100 bg-white p-7 shadow-lg shadow-pink-100/40 transition duration-500 group-hover:shadow-xl group-hover:shadow-pink-200/50">
                                        <motion.div
                                            whileHover={{
                                                scale: 1.2,
                                                rotate: 10,
                                            }}
                                            className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50 shadow-sm"
                                        >
                                            <Icon
                                                size={30}
                                                strokeWidth={1.7}
                                                className="text-pink-500"
                                            />
                                        </motion.div>

                                        {/* Number */}
                                        <div className="absolute right-5 top-5 font-playfair text-5xl text-pink-100">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>

                                        <h3 className="font-playfair text-2xl font-semibold text-rose-950">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-6 text-rose-900/60">
                                            {item.description}
                                        </p>

                                        {/* Bottom decoration */}
                                        <div className="mt-6 flex items-center gap-2 text-pink-300">
                                            <Heart
                                                size={12}
                                                fill="currentColor"
                                            />

                                            <div className="h-px flex-1 bg-pink-100" />

                                            <Sparkles size={12} />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Bottom message */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mx-auto mt-20 max-w-2xl text-center"
                    >
                        <p className="font-playfair text-2xl italic leading-relaxed text-rose-900/70 sm:text-3xl">
                            “You&apos;re a little chaotic, a little dramatic,
                            occasionally serious...”
                        </p>

                        <p className="mt-4 font-playfair text-2xl italic text-pink-500 sm:text-3xl">
                            ...and somehow, completely irreplaceable.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Little Memories */}

            <section
                id="little-memories"
                className="relative overflow-hidden bg-[#fffafc] px-6 py-32 sm:px-10 lg:px-16"
            >
                {/* Background */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-pink-100/40 blur-3xl" />

                <div className="relative mx-auto max-w-5xl">
                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mx-auto mb-20 max-w-2xl text-center"
                    >
                        <div className="mb-4 flex items-center justify-center gap-2 text-pink-500">
                            <Heart size={16} fill="currentColor" />

                            <span className="text-xs font-medium uppercase tracking-[0.35em]">
                                Chapter Four
                            </span>

                            <Heart size={16} fill="currentColor" />
                        </div>

                        <h2 className="font-playfair text-4xl font-semibold text-rose-950 sm:text-5xl md:text-6xl">
                            Little Things I Remember
                        </h2>

                        <p className="mt-6 text-base leading-7 text-rose-900/60 sm:text-lg">
                            Not the big dramatic moments.
                            <br />
                            Just the little things that somehow stayed with me.
                        </p>
                    </motion.div>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Center line */}
                        <div className="absolute left-5 top-0 h-full w-px bg-pink-200 sm:left-1/2 sm:-translate-x-1/2" />

                        <div className="space-y-16">
                            {littleMemories.map((memory, index) => {
                                const isRight = index % 2 !== 0;

                                return (
                                    <motion.div
                                        key={memory.number}
                                        initial={{
                                            opacity: 0,
                                            x: isRight ? 50 : -50,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            x: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                            amount: 0.25,
                                        }}
                                        transition={{
                                            duration: 0.7,
                                        }}
                                        className="relative grid grid-cols-[40px_1fr] gap-6 sm:grid-cols-2 sm:gap-16"
                                    >
                                        {/* Mobile dot */}
                                        <div className="absolute left-5 top-8 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-pink-400 ring-8 ring-[#fffafc] sm:left-1/2" />

                                        {/* Desktop alternating layout */}
                                        <div
                                            className={`${
                                                isRight
                                                    ? "sm:col-start-2 sm:row-start-1"
                                                    : "sm:col-start-1 sm:row-start-1"
                                            } col-start-2`}
                                        >
                                            <div className="rounded-3xl border border-pink-100 bg-white p-7 shadow-lg shadow-pink-100/30 sm:p-8">
                                                <div className="mb-5 flex items-center justify-between">
                                                    <span className="font-playfair text-4xl text-pink-100">
                                                        {memory.number}
                                                    </span>

                                                    <Heart
                                                        size={17}
                                                        className="text-pink-300"
                                                        fill="currentColor"
                                                    />
                                                </div>

                                                <h3 className="font-playfair text-2xl font-semibold text-rose-950">
                                                    {memory.title}
                                                </h3>

                                                <p className="mt-4 text-sm leading-7 text-rose-900/60">
                                                    {memory.text}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bottom message */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mx-auto mt-24 max-w-2xl text-center"
                    >
                        <Sparkles
                            size={20}
                            className="mx-auto mb-5 text-pink-400"
                        />

                        <p className="font-playfair text-2xl italic leading-relaxed text-rose-900/70 sm:text-3xl">
                            Maybe it&apos;s not the big moments that make a
                            friendship special.
                        </p>

                        <p className="mt-4 font-playfair text-2xl italic text-pink-500 sm:text-3xl">
                            Maybe it&apos;s all the little ones.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Friendship Movie */}

            <section
                id="friendship-movie"
                className="relative min-h-screen overflow-hidden bg-[#160b13] px-6 py-32 text-white sm:px-10 lg:px-16"
            >
                {/* Cinematic background */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(244,114,182,0.16),transparent_40%)]" />

                <div className="pointer-events-none absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-[120px]" />

                <div className="relative mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="w-full"
                    >
                        {/* Top label */}
                        <div className="mb-10 text-center">
                            <motion.div
                                initial={{ opacity: 0, letterSpacing: "0.1em" }}
                                whileInView={{
                                    opacity: 1,
                                    letterSpacing: "0.35em",
                                }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="text-xs font-medium uppercase text-pink-300"
                            >
                                Chapter Five
                            </motion.div>
                        </div>

                        {/* Movie Poster */}
                        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-4xl border border-pink-300/10 bg-linear-to-b from-rose-900/30 to-black p-8 shadow-2xl shadow-pink-950/30 sm:p-12 md:p-16">
                            {/* Decorative circles */}
                            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-pink-300/10" />

                            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full border border-pink-300/10" />

                            {/* Stars */}
                            <Sparkles
                                size={18}
                                className="absolute left-[12%] top-[18%] text-pink-300/50"
                            />

                            <Sparkles
                                size={12}
                                className="absolute right-[15%] top-[30%] text-pink-300/40"
                            />

                            <Sparkles
                                size={14}
                                className="absolute bottom-[20%] left-[20%] text-pink-300/40"
                            />

                            {/* Movie content */}
                            <div className="relative text-center">
                                <p className="text-xs uppercase tracking-[0.35em] text-pink-200/60">
                                    A story by two idiots
                                </p>

                                <h2 className="mt-8 font-playfair text-5xl font-semibold leading-none text-pink-50 sm:text-6xl md:text-8xl">
                                    {friendshipMovie.title}
                                </h2>

                                <div className="mx-auto mt-7 h-px w-24 bg-pink-300/50" />

                                <p className="mx-auto mt-7 max-w-xl font-playfair text-xl italic leading-8 text-pink-100/70 sm:text-2xl">
                                    {friendshipMovie.subtitle}
                                </p>

                                {/* Fake movie metadata */}
                                <div className="mx-auto mt-12 flex max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[10px] uppercase tracking-[0.2em] text-pink-200/50">
                                    <span>{friendshipMovie.genre}</span>

                                    <span className="hidden h-1 w-1 rounded-full bg-pink-300/40 sm:block" />

                                    <span>{friendshipMovie.duration}</span>

                                    <span className="hidden h-1 w-1 rounded-full bg-pink-300/40 sm:block" />

                                    <span>{friendshipMovie.rating}</span>
                                </div>

                                {/* Main quote */}
                                <div className="mx-auto mt-16 max-w-2xl">
                                    <p className="font-playfair text-2xl leading-relaxed text-white/90 sm:text-3xl">
                                        “Two people.
                                        <br />
                                        One friendship.
                                        <br />
                                        Absolutely no idea what they&apos;re
                                        doing.”
                                    </p>
                                </div>

                                {/* Cast */}
                                <div className="mt-16">
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-pink-300/50">
                                        Starring
                                    </p>

                                    <div className="mt-4 flex items-center justify-center gap-4">
                                        <span className="rounded-full border border-pink-300/20 bg-pink-300/5 px-5 py-2 text-sm text-pink-100/80">
                                            Sumu
                                        </span>

                                        <span className="text-pink-300">×</span>

                                        <span className="rounded-full border border-pink-300/20 bg-pink-300/5 px-5 py-2 text-sm text-pink-100/80">
                                            Richi
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mt-14 text-center"
                        >
                            <p className="font-playfair text-xl italic text-pink-200/60">
                                And somehow...
                            </p>

                            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-pink-300/40">
                                We&apos;re still waiting for the sequel.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== EMOTIONAL TRANSITION ==================== */}
            <section
                id="emotional-transition"
                className="relative overflow-hidden bg-linear-to-b from-[#2a1724] via-[#3a1d2f] to-[#fdf4f7] px-6 py-32 md:py-44"
            >
                {/* Soft background glow */}
                <motion.div
                    className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-400/10 blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <div className="relative mx-auto max-w-3xl text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-8 text-xs font-medium uppercase tracking-[0.4em] text-pink-200/70"
                    >
                        {emotionalTransition.label}
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.15 }}
                        className="font-playfair text-4xl leading-tight text-white md:text-6xl"
                    >
                        {emotionalTransition.title}
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mx-auto my-10 h-px w-16 bg-pink-200/40"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.4 }}
                        className="text-base leading-8 text-pink-50/80 md:text-lg md:leading-9"
                    >
                        {emotionalTransition.text}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.65 }}
                        className="mt-10 font-playfair text-2xl italic text-white md:text-3xl"
                    >
                        {emotionalTransition.highlight}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 1 }}
                        className="mt-16 flex justify-center"
                    >
                        <Heart
                            size={22}
                            strokeWidth={1.5}
                            className="text-pink-200/70"
                        />
                    </motion.div>
                </div>
            </section>

            {/* ==================== BIRTHDAY CAKE ==================== */}
            <section
                id="birthday-cake"
                className="relative overflow-hidden bg-[#fdf4f7] px-6 py-28 md:py-36"
            >
                <div className="mx-auto max-w-4xl text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-rose-400"
                    >
                        One More Thing
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.1 }}
                        className="font-playfair text-4xl text-[#4a2635] md:text-6xl"
                    >
                        Make a Wish, Pikachu...
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.25 }}
                        className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#795666] md:text-base"
                    >
                        Three years of friendship deserves a proper birthday
                        cake. And yes, you actually have to blow out the
                        candles.
                    </motion.p>

                    {/* Cake */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 40 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1,
                            delay: 0.4,
                            type: "spring",
                            stiffness: 100,
                        }}
                        className="relative mx-auto mt-20 flex h-82.5 w-full max-w-md items-end justify-center"
                    >
                        {/* Candle glow */}
                        {!candlesBlown && (
                            <motion.div
                                animate={{
                                    opacity: [0.25, 0.5, 0.25],
                                    scale: [0.95, 1.08, 0.95],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute bottom-51.25 h-40 w-72 rounded-full bg-pink-300/30 blur-3xl"
                            />
                        )}

                        {/* Candles */}
                        <div className="absolute bottom-52.5 z-20 flex gap-6">
                            {[1, 2, 3].map((candle) => (
                                <motion.div
                                    key={candle}
                                    initial={{ y: 10, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.7 + candle * 0.1,
                                    }}
                                    className="relative"
                                >
                                    {/* Flame */}
                                    {!candlesBlown && (
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.15, 0.95, 1],
                                                y: [0, -2, 1, 0],
                                            }}
                                            transition={{
                                                duration: 0.7,
                                                repeat: Infinity,
                                                delay: candle * 0.12,
                                            }}
                                            className="absolute -top-8 left-1/2 h-7 w-4 -translate-x-1/2 rounded-full bg-orange-400 shadow-[0_0_18px_rgba(251,146,60,0.7)]"
                                        />
                                    )}

                                    {/* Candle */}
                                    <div className="h-20 w-5 rounded-t-md bg-linear-to-b from-rose-300 to-rose-400 shadow-sm">
                                        <div className="mx-auto h-full w-0.5 bg-white/40" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Top cake layer */}
                        <div className="absolute bottom-30 z-10 h-24 w-72 rounded-[28px] bg-[#f8b8c8] shadow-xl md:w-80">
                            {/* Cream */}
                            <div className="absolute -top-3 left-0 h-8 w-full rounded-full bg-[#fff5f7]" />

                            {/* Cream drips */}
                            <div className="absolute -top-1 left-10 h-8 w-8 rounded-b-full bg-[#fff5f7]" />
                            <div className="absolute -top-1 left-28 h-11 w-8 rounded-b-full bg-[#fff5f7]" />
                            <div className="absolute -top-1 right-28 h-9 w-8 rounded-b-full bg-[#fff5f7]" />
                            <div className="absolute -top-1 right-10 h-7 w-8 rounded-b-full bg-[#fff5f7]" />

                            {/* Decorations */}
                            <div className="absolute bottom-5 left-8 h-3 w-3 rounded-full bg-white/70" />
                            <div className="absolute bottom-7 left-20 h-3 w-3 rounded-full bg-white/70" />
                            <div className="absolute bottom-4 right-20 h-3 w-3 rounded-full bg-white/70" />
                            <div className="absolute bottom-7 right-8 h-3 w-3 rounded-full bg-white/70" />
                        </div>

                        {/* Bottom cake layer */}
                        <div className="absolute bottom-16.25 h-24 w-80 rounded-[30px] bg-[#e997ad] shadow-2xl md:w-96">
                            {/* Cream */}
                            <div className="absolute -top-3 left-0 h-8 w-full rounded-full bg-[#fff5f7]" />

                            {/* Cream drips */}
                            <div className="absolute -top-1 left-12 h-9 w-9 rounded-b-full bg-[#fff5f7]" />
                            <div className="absolute -top-1 left-32 h-7 w-9 rounded-b-full bg-[#fff5f7]" />
                            <div className="absolute -top-1 right-32 h-10 w-9 rounded-b-full bg-[#fff5f7]" />
                            <div className="absolute -top-1 right-12 h-7 w-9 rounded-b-full bg-[#fff5f7]" />
                        </div>

                        {/* Plate */}
                        <div className="absolute bottom-10 h-8 w-90 rounded-full bg-[#d9829b] shadow-lg md:w-107.5" />
                    </motion.div>

                    {/* Button / result */}
                    <AnimatePresence mode="wait">
                        {!candlesBlown ? (
                            <motion.div
                                key="wish-button"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.8 }}
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={blowCandles}
                                    className="rounded-full bg-[#4a2635] px-8 py-4 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
                                >
                                    Blow Out the Candles
                                </motion.button>

                                <p className="mt-4 text-xs text-[#9a7181]">
                                    Close your eyes first. Make a really good
                                    wish.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="birthday-message"
                                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <p className="font-playfair text-3xl text-[#4a2635] md:text-4xl">
                                    Happy Birthday, Energy Biscuit 😒
                                </p>

                                <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#795666]">
                                    I hope this year brings you more laughter,
                                    more adventures, more beautiful memories,
                                    and absolutely no shortage of chaos.
                                </p>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-6 flex justify-center"
                                >
                                    <Heart
                                        size={22}
                                        strokeWidth={1.5}
                                        className="text-rose-400"
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* ==================== PERSONAL LETTER ==================== */}
            <section
                id="birthday-letter"
                className="relative overflow-hidden bg-[#fdf4f7] px-6 py-32 md:py-40"
            >
                <div className="mx-auto max-w-3xl text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-rose-400"
                    >
                        A Few Words From Me
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.1 }}
                        className="font-playfair text-4xl text-[#4a2635] md:text-6xl"
                    >
                        One Last Thing...
                    </motion.h2>

                    {!letterOpen ? (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.3 }}
                            className="mt-20"
                        >
                            {/* Envelope */}
                            <motion.div
                                whileHover={{ y: -8 }}
                                transition={{ type: "spring", stiffness: 250 }}
                                className="relative mx-auto h-52 w-80 cursor-pointer md:h-60 md:w-105"
                                onClick={() => setLetterOpen(true)}
                            >
                                {/* Envelope shadow */}
                                <div className="absolute inset-x-4 bottom-0 h-8 rounded-full bg-rose-900/10 blur-xl" />

                                {/* Envelope body */}
                                <div className="absolute inset-0 overflow-hidden rounded-xl bg-[#e9a6b9] shadow-2xl">
                                    {/* Left fold */}
                                    <div
                                        className="absolute bottom-0 left-0 h-full w-1/2"
                                        style={{
                                            clipPath:
                                                "polygon(0 0, 100% 50%, 0 100%)",
                                            background: "#d98da5",
                                        }}
                                    />

                                    {/* Right fold */}
                                    <div
                                        className="absolute bottom-0 right-0 h-full w-1/2"
                                        style={{
                                            clipPath:
                                                "polygon(100% 0, 100% 100%, 0 50%)",
                                            background: "#d58aa2",
                                        }}
                                    />

                                    {/* Bottom fold */}
                                    <div
                                        className="absolute bottom-0 left-0 h-1/2 w-full"
                                        style={{
                                            clipPath:
                                                "polygon(0 100%, 50% 0, 100% 100%)",
                                            background: "#df96ad",
                                        }}
                                    />

                                    {/* Heart seal */}
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.05, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                        }}
                                        className="absolute left-1/2 top-1/2 z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg"
                                    >
                                        <Heart
                                            size={22}
                                            fill="currentColor"
                                            strokeWidth={1.5}
                                            className="text-rose-400"
                                        />
                                    </motion.div>

                                    {/* Top flap */}
                                    <div
                                        className="absolute left-0 top-0 z-10 h-1/2 w-full"
                                        style={{
                                            clipPath:
                                                "polygon(0 0, 100% 0, 50% 100%)",
                                            background: "#f2b4c4",
                                        }}
                                    />
                                </div>
                            </motion.div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => setLetterOpen(true)}
                                className="mt-10 rounded-full bg-[#4a2635] px-8 py-4 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
                            >
                                Open My Letter
                            </motion.button>

                            <p className="mt-4 text-xs text-[#9a7181]">
                                I promise it&apos;s not as dramatic as it looks.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.9,
                                ease: "easeOut",
                            }}
                            className="mx-auto mt-16 max-w-2xl rounded-2xl bg-[#fffafc] px-7 py-10 text-left shadow-xl shadow-rose-900/5 md:px-14 md:py-14"
                        >
                            {/* Letter header */}
                            <div className="mb-8 flex items-center justify-between border-b border-rose-100 pb-5">
                                <Heart
                                    size={20}
                                    strokeWidth={1.5}
                                    className="text-rose-400"
                                />

                                <span className="text-xs uppercase tracking-[0.25em] text-rose-300">
                                    17 • 09 • 2026
                                </span>
                            </div>

                            {/* Greeting */}
                            <h3 className="font-playfair text-3xl text-[#4a2635] md:text-4xl">
                                {birthdayLetter.greeting}
                            </h3>

                            {/* Paragraphs */}
                            <div className="mt-8 space-y-6 text-sm leading-8 text-[#795666] md:text-base md:leading-9">
                                {birthdayLetter.paragraphs.map(
                                    (paragraph, index) => (
                                        <motion.p
                                            key={index}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: 0.3 + index * 0.15,
                                            }}
                                        >
                                            {paragraph}
                                        </motion.p>
                                    ),
                                )}
                            </div>

                            {/* Closing */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 1,
                                }}
                                className="mt-10 border-t border-rose-100 pt-8"
                            >
                                <p className="font-playfair text-xl leading-8 text-[#4a2635] md:text-2xl">
                                    {birthdayLetter.closing}
                                </p>

                                <p className="mt-6 font-playfair text-lg italic text-rose-400">
                                    {birthdayLetter.signature}
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* ==================== FINAL SURPRISE ==================== */}
            <section
                id="final-surprise"
                className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#24151f] px-6 py-32"
            >
                {/* Background glow */}
                <motion.div
                    className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-400/10 blur-[120px]"
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.25, 0.45, 0.25],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Floating hearts */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute left-[15%] top-[20%]"
                >
                    <Heart
                        size={18}
                        strokeWidth={1.3}
                        className="text-rose-300/40"
                    />
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, 15, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        delay: 1,
                        ease: "easeInOut",
                    }}
                    className="absolute right-[18%] top-[30%]"
                >
                    <Heart
                        size={14}
                        strokeWidth={1.3}
                        className="text-rose-300/30"
                    />
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, -15, 0],
                        opacity: [0.2, 0.45, 0.2],
                    }}
                    transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        delay: 0.5,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-[20%] left-[25%]"
                >
                    <Heart
                        size={12}
                        strokeWidth={1.3}
                        className="text-rose-300/30"
                    />
                </motion.div>

                <div className="relative z-10 mx-auto max-w-3xl text-center">
                    {/* Small label */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-8 text-xs uppercase tracking-[0.4em] text-rose-200/50"
                    >
                        The End... Probably
                    </motion.p>

                    {/* Main title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="font-playfair text-5xl leading-tight text-white md:text-7xl"
                    >
                        {finalSurprise.title}
                    </motion.h2>

                    {/* Divider */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mx-auto my-10 h-px w-16 bg-rose-200/30"
                    />

                    {/* Message */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.4 }}
                        className="text-base leading-8 text-rose-50/70 md:text-lg md:leading-9"
                    >
                        {finalSurprise.message}
                    </motion.p>

                    {/* Wish */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.7 }}
                        className="mx-auto mt-8 max-w-2xl text-sm leading-8 text-rose-100/60 md:text-base md:leading-9"
                    >
                        {finalSurprise.wish}
                    </motion.p>

                    {/* Year 4 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 1 }}
                        className="mt-14"
                    >
                        <p className="font-playfair text-3xl italic text-rose-100 md:text-4xl">
                            {finalSurprise.ending}
                        </p>

                        <p className="mt-4 text-sm tracking-wide text-rose-200/50">
                            {finalSurprise.signature}
                        </p>
                    </motion.div>

                    {/* Heart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            delay: 1.3,
                            type: "spring",
                        }}
                        className="mt-16 flex justify-center"
                    >
                        <Heart
                            size={28}
                            strokeWidth={1.3}
                            className="text-rose-300/70"
                        />
                    </motion.div>

                    {/* Signature */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 1.6 }}
                        className="mt-20 text-[10px] uppercase tracking-[0.5em] text-rose-200/30"
                    >
                        Made with way too much love & chaos
                    </motion.p>
                </div>
            </section>
        </main>
    );
}
