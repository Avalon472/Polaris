import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import HomePage from "./pages/home/HomePage";

function App() {
  return (
    <div className="flex w-screen h-screen bg-bg">
      {/* sidebar */}
      <Navbar />
      {/* main body */}
      <div className="w-[100%] mx-auto bg-bg2">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
