import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { AllJobsContextProvider } from "./contexts/JobsContext";
import { Home } from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { Profile } from "./pages/Profile";
import { NotFound } from "./pages/NotFound";

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AllJobsContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Toaster
            toastOptions={{
              style: {
                padding: "1rem",
                fontSize: "1.25rem",
                backgroundColor: "#eee",
              },
            }}
          />
        </AllJobsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
