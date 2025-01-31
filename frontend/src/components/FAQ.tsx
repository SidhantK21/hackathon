import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const Dropdown = ({ question, answer }: FAQItem) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center cursor-pointer bg-black text-white py-4 px-4 rounded-lg"
        style={{ padding: '16px 0' }}
      >
        <h3 className="text-[20px] font-bold">{question}</h3>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="bg-black text-white py-2 px-4 rounded-b-lg">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const questionsAndAnswers: FAQItem[] = [
    {
      question: 'Is your audio summarizer free?',
      answer: 'Yes, our audio summarizer is free to use with basic features. Premium options are available for advanced functionalities. You can summarize unlimited short clips without any cost, while longer files might require a premium plan. Our goal is to provide accessible summarization tools for everyone, including students, professionals, and researchers who need quick insights from their audio content.',
    },
    {
      question: 'Is my audio data secure?',
      answer: 'Absolutely! We prioritize security and use encryption to protect your audio data throughout processing. All files are transmitted using secure protocols, ensuring that no unauthorized access occurs. Additionally, we comply with industry-standard data protection policies to safeguard user privacy. Your uploaded audio is only accessible to you, and we do not share or analyze your content for any external purposes.',
    },
    {
      question: 'Do you store my audio files or summaries?',
      answer: 'No, we do not store any uploaded audio files or generated summaries. Everything is processed securely and deleted after use. Once the summarization is complete, the data is automatically removed from our servers to maintain confidentiality. This ensures that users have full control over their content, and no residual traces of their files remain in our system.',
    },
    {
      question: 'Is there a word limit for summaries?',
      answer: 'Yes, free users have a limit of 500 words per summary. Premium users can generate longer summaries without restrictions. If you frequently need detailed summaries for extensive recordings, upgrading to a premium plan can help you get full-length insights without any truncation. We designed our summarization tool to be flexible, ensuring that both short and long-form content can be effectively processed.',
    },
    {
      question: 'What audio formats are supported?',
      answer: 'We support MP3, WAV, M4A, and other common audio formats for seamless processing and summarization. Whether your audio is recorded on a smartphone, professional recorder, or converted from video, our tool can handle it efficiently. We continuously update our system to include support for more formats, ensuring compatibility with a wide range of recording devices and software applications.',
    },
  ];


  return (
    <div className="bg-black text-white px-8 py-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold mb-6" style={{ padding: '60px 100px' }}>
          Common Questions
        </h2>
      </div>
      <div className="container mx-auto px-4">
        {questionsAndAnswers.map((item, index) => (
          <Dropdown key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
