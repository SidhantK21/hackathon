import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface CardProps {
  heading: string;
  text: string;
  imgSrc: string;
}

const cards = [
  {
    heading: "AI-Powered Summarization",
    text: "Just speak, we’ll summarize.\nOur AI listens to your audio and delivers concise, accurate summaries in seconds. No need to fiddle with tools yourself – let the AI do the heavy lifting.",
    imageSrc: "src/assets/1.png",
  },
  {
    heading: "Effortless Collaboration",
    text: "Work smarter, together.\nShare summaries with your team and collaborate in real-time. Perfect for remote teams, students, and professionals.",
    imageSrc: "src/assets/2.png",
  },
  {
    heading: "Secure & Private",
    text: "Your data, your control.\nWe prioritize your privacy. Your audio files and summaries are secure, and we never store your data without permission.",
    imageSrc: "src/assets/3.png",
  },
  {
    heading: "Seamless Teamwork",
    text: "Boost productivity with smooth teamwork.\nShare insights instantly and keep everyone on the same page with real-time summaries.",
    imageSrc: "/src/assets/4.png",
  },
  {
    heading: "Cross-Platform Access",
    text: "Summarize on the go.\nAccess our tools from any device – desktop, tablet, or mobile. Your summaries, wherever you are.",
    imageSrc: "/src/assets/5.png",
  },
  {
    heading: "Multi-Language Support",
    text: "Break language barriers.\nSummarize audio in multiple languages with high accuracy. Whether it’s English, Spanish, French, or beyond, our AI has you covered.",
    imageSrc: "/src/assets/6.png",
  },
];

export const Card: React.FC<CardProps> = ({ heading, text, imgSrc }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full max-w-sm p-6 border-[#31306088] rounded-[8px] flex flex-col gap-4 bg-[#1f1e3d] text-white shadow-lg overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover Background Effect */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] rounded-3xl"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex items-center gap-4">
        {/* Image */}
        <img src={imgSrc} alt="icon" className="w-[50px] h-[50px]" />
      </div>

      {/* Heading */}
      <h3 className="relative z-10 text-left text-xl font-semibold mt-4">{heading}</h3>

      {/* Card Text */}
      <p className="relative z-10 text-[22px] leading-[1.5] mb-2 text-[var(--white-8-color)] font-sans">
        {text}
      </p>
    </div>
  );
};

export const CardGrid: React.FC = () => {
  return (
    <div
      className="w-full min-h-screen flex flex-col justify-center items-center bg-[rgb(9,7,18)] px-8 py-12 space-y-6"
      style={{ padding: "60px 100px" }}
    >
      {/* Heading */}
      <h2 className="font-bold text-[30px] m-0 text-white mb-[72px]">
        What Makes Our Meeting Summarizer Different
      </h2>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card key={index} heading={card.heading} text={card.text} imgSrc={card.imageSrc} />
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
