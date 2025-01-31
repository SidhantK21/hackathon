import React from 'react';

// Component Definition
const UseCaseSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center text-center gap-[var(--gap-5)] bg-black p-[60px] pt-[60px] pr-[100px] pb-[60px] pl-[100px]">
      {/* Heading 2 */}
      <h2 className="text-[35px] font-semibold text-white ">
        Use Cases
      </h2>
      
      {/* Heading 4 */}
      <h4 className="text-[20px] font-medium text-[#cfcfd2] mt-[10px]">
        Loved by our 1M users, boost productivity by 10x in daily study, work and life!
      </h4>
    </section>
  );
};

export default UseCaseSection;
