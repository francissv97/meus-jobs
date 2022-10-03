import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Home } from "./pages/Home";

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/job/:id" element={<Job />} /> */}
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
