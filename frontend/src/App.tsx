import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { UploadPage } from "./components/upld";
import { LandingPage } from "./components/landingpage";
import { Navbar } from "./components/navbar";
import Footer from "./components/footer";
import { CardGrid } from "./components/cards";
import UseCaseSection from './components/UserCaseSection';
import UseCaseSectionWithContent from "./components/SectionWithImage";
import RevUseCaseSectionWithContent from "./components/ReverseSectionImage";
import FAQ from "./components/FAQ";
import { SignupFormDemo } from "./components/SignUp";
import { SignInFormDemo } from './components/Signin';

function App() {
  const location = useLocation(); // Get the current route location

  // Check if the current route is "/signup" or "/signin"
  const isAuthPage = location.pathname === "/signup" || location.pathname === "/signin";

  return (
    <>
      {/* Conditionally render Navbar and Footer if not on the signup or signin page */}
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LandingPage />
              <CardGrid />
              <UseCaseSection />
              <UseCaseSectionWithContent />
              <RevUseCaseSectionWithContent />
              <UseCaseSectionWithContent />
              <FAQ />
            </>
          }
        />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/signup" element={<SignupFormDemo />} /> {/* Signup route */}
        <Route path="/signin" element={<SignInFormDemo />} /> {/* Signin route */}
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
}

// Wrap the App component with Router
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;