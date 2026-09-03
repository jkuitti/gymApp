import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Workouts from "./pages/Workouts";
import Login from "./pages/Login";

function App() {
  return (
    <div className="flex flex-col items-center gap-2 bg-[#0f172b] min-h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
