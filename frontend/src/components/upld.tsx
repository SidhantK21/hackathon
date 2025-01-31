export const UploadPage = () => {
    return (
      <>
        {/* Hero Section */}
        <section className="w-full bg-blue-600 text-white py-20 text-center">
          <h1 className="text-5xl font-bold mb-4">Upload Your PDF for Summarization</h1>
          <p className="text-lg mb-6">
            Upload any PDF, and we’ll summarize the content for you in seconds.
          </p>
        </section>
  
        {/* Main Upload Section */}
        <section className="relative py-20 bg-gray-100">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
            {/* Left Sidebar - Hidden on smaller screens */}
            <div className="w-full sm:w-44 bg-gray-200 shadow-md rounded-lg p-4 mb-8 sm:mb-0 sm:flex sm:flex-col items-center">
              {/* User Avatar */}
              <div className="w-14 h-14 bg-gray-400 rounded-full flex items-center justify-center text-white text-lg font-semibold mb-3">
                U
              </div>
              {/* Divider */}
              <div className="w-full border-b border-gray-300 mb-3"></div>
              {/* Sidebar Content */}
              <div className="text-gray-700 font-medium">Dashboard</div>
            </div>
  
            {/* Right Content (Upload Form) */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 w-full">
              <h2 className="font-bold text-3xl mb-4">What do you want to ask?</h2>
  
              {/* Upload Input - Desktop and Mobile */}
              <div className="w-full sm:w-2/3 flex flex-col items-center gap-6 p-4 bg-white border border-gray-300 rounded-md">
                {/* Input Container */}
                <div className="w-full flex flex-col items-center gap-2">
                  <input
                    type="file"
                    accept=".pdf"
                    className="w-full h-12 px-4 border-none outline-none text-gray-900 rounded-md"
                    placeholder="Upload your PDF"
                  />
                  <button className="bg-black text-white p-3 rounded-lg mt-4">
                    Upload PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
  
          {/* Chat-style input for query (fixed inside the section) */}
          <div className="absolute bottom-0 w-full p-3 flex items-center gap-2 bg-white border-t border-gray-300">
            <input
              type="text"
              placeholder="Enter your query"
              className="flex-1 px-4 py-3 border border-gray-300 outline-none text-gray-900 rounded-lg"
            />
            <button className="bg-black text-white p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-up-from-line"
              >
                <path d="m18 9-6-6-6 6" />
                <path d="M12 3v14" />
                <path d="M5 21h14" />
              </svg>
            </button>
          </div>
        </section>
      </>
    );
  };
  