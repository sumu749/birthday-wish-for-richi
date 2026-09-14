"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Volume2, VolumeX, ArrowDown } from "lucide-react";

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
            <audio ref={audioRef} src="/music/birthday.m4a" loop />

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

            {/* Temporary next section */}
            <section
                id="memories"
                className="flex min-h-screen items-center justify-center bg-[#fff0f5] px-6"
            >
                <div className="text-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-rose-400">
                        Coming next...
                    </p>

                    <h2 className="mt-4 font-playfair text-5xl font-bold text-[#6d3048]">
                        Our Memories 📸
                    </h2>
                </div>
            </section>
        </main>
    );
}
