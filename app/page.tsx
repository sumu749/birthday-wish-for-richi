"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, Sparkles, Volume2, VolumeX, ArrowDown } from "lucide-react";
import { photos } from "@/data/memories";

export default function Home() {
    const [started, setStarted] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

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
        </main>
    );
}
