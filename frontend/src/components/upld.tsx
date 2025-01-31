import axios from "axios";
import { useState } from "react";

export const UploadPage = () => {
  const [path, setPath] = useState("/Users/sidhantsinghrathore/Downloads/test.mp3");
  const [userInp, setUserInp] = useState("");
  const [queryResponse, setQueryResponse] = useState("");
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      setProcessing(true);
      setMessage("");

      const response = await axios.post("http://localhost:3000/services/datatoprocess/pdfUp", {
        path: path,
      });

      console.log("Response:", response.data);
      setMessage("Processing completed successfully!");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error processing file. Please check the console.");
    } finally {
      setProcessing(false);
    }
  };

  const handleSubmitQuery = async () => {
    try {
      setProcessing(true);
      // setQueryResponse("");

      const response = await axios.post("http://localhost:3000/services/askai/query", {
        userInp,
      });

      console.log("Server Response:", response.data); // Log the entire response for debugging

      // Extract the summarized content from the response
      const summarizedContent = response.data.summaryOutput?.message?.content;

      console.log(summarizedContent);
      if (summarizedContent) {
        setQueryResponse(summarizedContent); // Set the summarized content
      } else {
        setQueryResponse("No summarized content found.");
      }
    } catch (error) {
      console.error("Error:", error);
      setQueryResponse("Error fetching response. Please check the console.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center text-white justify-center bg-black p-6  border-white ">
      <div className="w-full max-w-lg bg-black text-white p-6 rounded-lg shadow-md border border-white">
        <h2 className="text-3xl font-semibold text-center text-white text-white-700 mb-4 border-white">Upload & Query</h2>

        <div className="space-y-4 text-white">
          {/* File Path Input */}
          <div>
            <label className="block text-white text-sm mb-1">File Path</label>
            <input
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
              placeholder="Enter file path"
              disabled={processing}
            />
          </div>

          {/* Query Input */}
          <div>
            <label className="block text-white text-sm mb-1">Enter Query</label>
            <input
              type="text"
              value={userInp}
              onChange={(e) => setUserInp(e.target.value)}
              className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
              placeholder="Enter the query"
              disabled={processing}
            />
          </div>

          {/* Buttons */}
          <button
            onClick={handleSubmitQuery}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
          >
            {processing ? "Processing..." : "Submit Query"}
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={processing}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
          >
            {processing ? "Processing..." : "Upload File"}
          </button>

       

          {/* Query Response Display */}
          <div className="mt-4 p-3 bg-gray-50 border border-gray-300 rounded">
            <h3 className="text-gray-700 font-semibold">AI Response:</h3>
            <p className="text-gray-600">
              {queryResponse}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};