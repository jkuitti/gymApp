import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Exercises from "./pages/Exercises";
import Login from "./pages/Login";
import NewExercise from "./pages/NewExercise";
import Exercise from "./pages/Execise";
import NewWorkout from "./pages/NewWorkout";
import History from "./pages/History";
import Workout from "./pages/Workout";
import OnGoingWorkout from "./pages/OnGoingWorkout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="flex flex-col items-center gap-2 bg-[#0f172b] min-h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exercises"
          element={
            <ProtectedRoute>
              <Exercises />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newexercise"
          element={
            <ProtectedRoute>
              <NewExercise />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exercises/:exerciseid"
          element={
            <ProtectedRoute>
              <Exercise />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newworkout"
          element={
            <ProtectedRoute>
              <NewWorkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history/:workoutid"
          element={
            <ProtectedRoute>
              <Workout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ongoingworkout"
          element={
            <ProtectedRoute>
              <OnGoingWorkout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
