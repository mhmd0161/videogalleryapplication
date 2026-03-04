import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BrowseVideos from "./pages/BrowseVideos";
import UploadVideo from "./pages/UploadVideo";
import MyVideos from "./pages/MyVideos";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<BrowseVideos />} />
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/my-videos" element={<MyVideos />} />
      </Routes>
    </>
  );
}