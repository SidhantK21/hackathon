"use client";
import React, { useState } from "react"; // Import useState
import { Input } from "./input";
import { cn } from "../lib/utils";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export function SignInFormDemo() {
  // State to store form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Hook for navigation
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value, // Update the corresponding field
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const signin = await axios.post("/api/signin", formData); // Replace with your API endpoint
      console.log(signin.data);

      // Redirect to /uploads on successful sign-in
      if (signin.status === 200) {
        navigate("/uploads");
      }
    } catch (error) {
      console.error("Sign-in failed:", error);
      // Handle sign-in error (e.g., show error message)
    }
  };

  // Handle navigation to the sign-up page
  const handleSignUpClick = () => {
    navigate("/signup"); // Use navigate instead of window.location.href
  };

  return (
    <div
      style={{
        backgroundImage: `url('/src/assets/bg.png')`, // Add your background image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "420px",
          display: "flex",
          flexDirection: "column",
          color: "#fff",
          padding: "0 40px",
          position: "relative",
          background: "hsla(0, 0%, 100%, .1)",
          boxShadow:
            "0 0 4px #7c85f9, inset -1px 0 1px hsla(0, 0%, 100%, .04), inset 0 0 6px hsla(0, 0%, 100%, .03)",
          backdropFilter: "blur(8.5px)",
          WebkitBackdropFilter: "blur(8.5px)",
          borderRadius: "22px",
          margin: "auto", // Set all margins to auto
          transform: "translateX(100%)", // Move the form to the leftmost side
        }}
      >
        <h1
          style={{
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "40px",
            lineHeight: "40px",
            color: "hsla(0, 0%, 93.7%, .8)",
            textAlign: "center",
            marginTop: "20px", // Adjusted to match your design
          }}
        >
          Sign In
        </h1>

        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-3">
            <LabelInputContainer>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="john.doe@example.com"
                type="email"
                value={formData.email} // Bind value to state
                onChange={handleInputChange} // Handle input change
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                value={formData.password} // Bind value to state
                onChange={handleInputChange} // Handle input change
              />
            </LabelInputContainer>
          </div>

          <button
            className="w-full mt-6 mb-4 bg-gradient-to-br from-purple-600 to-blue-500 text-white h-12 font-semibold rounded-md hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl"
            type="submit"
          >
            Sign in &rarr;
          </button>
        </form>

        {/* Updated h1 with centered alignment, extra light font, and click handler */}
        <h1
          style={{
            textAlign: "center",
            fontWeight: 200, // Extra light font weight
            cursor: "pointer", // Show pointer on hover
            marginBottom: "20px", // Add some spacing at the bottom
          }}
          onClick={handleSignUpClick}
        >
          Don't have an account?{" "}
          <span className="hover:text-amber-800 underline">Sign Up</span>
        </h1>
      </div>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};