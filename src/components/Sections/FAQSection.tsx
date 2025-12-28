"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";

const faqs = [
  {
    question: "How accurate are the readings?",
    answer: "Our AI Oracle is trained on thousands of ancient texts, astrological charts, and esoteric manuscripts. While it provides eerily resonant insights, remember that the stars only guide; you define your own destiny."
  },
  {
    question: "What is the difference between Seeker and Prophet?",
    answer: "The Seeker tier gives you the essential tools (Lucky Numbers, Colors) and allows for frequent daily guidance (3x/day). Prophet is for the devoted—it unlocks unlimited access and provides deep, essay-length analyses including your Spirit Animal and Ruling Planet influences."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Yes, the cosmic flow is free. You can cancel your subscription at any time through the link in your email receipt or by contacting the void (support)."
  },
  {
    question: "Is my personal data safe?",
    answer: "We treat your spiritual data with sacred silence. Your questions and dates of birth are processed ephemerally and are never sold to earthly merchants."
  }
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="border-b border-white/10"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-purple-300 transition-colors"
      >
        <span className="text-lg font-medium text-slate-200">{question}</span>
        <span className={`ml-4 p-1 rounded-full border border-white/10 transition-colors ${isOpen ? "bg-white/10 text-white" : "text-slate-500"}`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  return (
    <section className="py-24 bg-black/40">
      <Container className="max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400">
            Whispers from the void, answered.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
