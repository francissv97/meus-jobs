import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { JobsContextProvider } from "./contexts/JobsContext";
import { Home } from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { Profile } from "./pages/Profile";

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <JobsContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/job/:id" element={<Job />} /> */}
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
        </JobsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
