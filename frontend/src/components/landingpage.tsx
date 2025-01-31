import { TypewriterEffect } from "../components/typewriter-effect";

export const LandingPage = () => {
  const words = [
    { text: "Turn" },
    { text: "your" },
    { text: "meetings" },
    { text: "into" },
    { text: "summaries.", className: "text-blue-500 dark:text-blue-500" },
  ];

  return (
    <>
      {/* Full viewport section */}
      <div className="w-full h-screen flex flex-col justify-end items-center bg-[#07060e] text-white px-8 space-y-6">
        
        {/* H1 - Main Heading with Typewriter Effect */}
        <h1 className="text-[56px] font-semibold text-center leading-tight font-sans mb-6">
          <TypewriterEffect words={words} />{" "}
        </h1>

        {/* P - Subheading */}
        <div className="space-y-2 mb-6">
          <p className="text-[24px] text-center text-[rgb(229,231,235)]">
            Transform ideas into ready-to-use flowcharts, mind maps, matrices, and presentations
          </p>
          <p className="text-[24px] text-center text-[rgb(229,231,235)]">
            Simply by chatting with AI —{" "}
            <strong className="font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#c59efa] via-[#cc9efa] to-[#8ee7f3]">
              no design skills needed.
            </strong>
          </p>
        </div>

        {/* Try for Free Button */}
        <div>

<button className="p-[3px] relative">
<div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
<div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
Try for Free
</div>
</button>
</div>

        {/* Image */}
        <img src="/src/assets/svg.png" alt="AI-powered tool" />
      </div>
    </>
  );
};
