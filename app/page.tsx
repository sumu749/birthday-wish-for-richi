"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function Home() {
    return (
        <main className="min-h-screen overflow-hidden bg-[#fff7fa]">
            {/* Floating Hearts */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                {Array.from({ length: 15 }).map((_, index) => (
                    <motion.div
                        key={index}
                        className="absolute text-pink-300/50"
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

            {/* Hero */}
            <section className="relative flex min-h-screen items-center justify-center px-6">
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
                        conversations, and memories...
                        <br />
                        <span className="font-medium text-rose-400">
                            and somehow, you still haven&apos;t gotten rid of
                            me.
                        </span>
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8 }}
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

                {/* Bottom text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
                >
                    <p className="text-xs uppercase tracking-[0.25em] text-rose-300">
                        scroll when you&apos;re ready
                    </p>
                </motion.div>
            </section>
        </main>
    );
}
