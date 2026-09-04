import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Exercises from "./pages/Exercises";
import Login from "./pages/Login";
import NewExercise from "./pages/NewExercise";
import Exercise from "./pages/Execise";
import NewWorkout from "./pages/NewWorkout";

function App() {
  return (
    <div className="flex flex-col items-center gap-2 bg-[#0f172b] min-h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/newexercise" element={<NewExercise />} />
        <Route path="/exercises/:exerciseid" element={<Exercise />} />
        <Route path="/newworkout" element={<NewWorkout />} />
      </Routes>
    </div>
  );
}

export default App;
