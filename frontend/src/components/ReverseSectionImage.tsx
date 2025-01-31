import React from 'react';

const RevUseCaseSectionWithContent: React.FC = () => {
  return (
    <section className="flex bg-black py-[60px] px-[100px] gap-[72px]">
      {/* First Child: Image */}
      <div className="flex-1">
        <img src="src/assets/web.png" alt="Students & Researchers" className="w-full h-full object-cover" />
      </div>

      {/* Second Child: Content */}
      <div className="flex flex-col gap-5 flex-1">
        <h2 className="text-[35px] font-semibold text-white">
          Students & Researchers
        </h2>
        <p className="text-[22px] leading-[1.5] mb-[24px] text-white/80">
        AI Meeting Summarizer streamlines the process of managing meeting notes for professionals. By converting recordings into concise summaries, it saves time and ensures key insights and action items are easily accessible. Whether for team discussions, client meetings, or project updates, it helps maintain focus and enhances productivity through organized, shareable 
        </p>
        <div>
          <button className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
              Try for Free
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default RevUseCaseSectionWithContent;
