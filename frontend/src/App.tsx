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
  const location = useLocation();

  // Updated to include /uploads in the auth pages check
  const isAuthPage = location.pathname === "/signup" || 
                    location.pathname === "/signin" ||
                    location.pathname === "/uploads";

  return (
    <>
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
        <Route path="/signup" element={<SignupFormDemo />} />
        <Route path="/signin" element={<SignInFormDemo />} />
        {/* Updated uploads route to follow the pattern */}
        <Route path="/uploads" element={<UploadPage />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;