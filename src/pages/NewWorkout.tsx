import { useLatestWorkout } from "../hooks/queries/useLatestWorkout";
import { useExercises } from "../hooks/queries/useExercises";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StartWorkoutModal from "../components/newworkout/StartWorkoutModal";
import type { Exercise } from "../types/exercise";

const NewWorkout = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise>();

  const { data: latestWorkout, error: workoutError } = useLatestWorkout();

  if (workoutError) {
    throw workoutError;
  }

  const { data: exercises, error: exercisesError } = useExercises();

  if (exercisesError) {
    throw exercisesError;
  }

  const handleModal = (exercise: Exercise) => {
    if (exercise) {
      setSelectedExercise(exercise);
      setOpenModal(true);
    }
  };

  return (
    <div className="mt-10 flex flex-col justify-center items-center">
      <p className="text-white text-lg">Last workout</p>
      <div className="text-white flex flex-col items-center justify-center">
        {latestWorkout?.status === "finished" ? (
          <div className="flex flex-col items-center">
            <p>{latestWorkout?.exercise.name} </p>
            <p className="text-sm">
              {latestWorkout?.started_at &&
                new Date(latestWorkout.started_at).toLocaleDateString("fi-FI")}
            </p>
            <p className="text-white mt-10">Select next exercise</p>
            <div className="flex flex-col gap-4 mt-2 text-white">
              {exercises?.map((exercise) => (
                <div
                  className="border rounded-lg bg-black text-center p-2 min-w-20"
                  key={exercise.id}
                  onClick={() => handleModal(exercise)}
                >
                  {exercise.name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center mt-5">
            <p>Workout {latestWorkout?.exercise.name} in progress</p>
            <p>Started </p>
            <p className="text-sm">
              {latestWorkout?.started_at &&
                new Date(latestWorkout.started_at).toLocaleDateString("fi-FI")}
            </p>
            <button className="rounded-lg border text-black bg-gray-300 mt-10 p-1 min-w-20">
              Continue
            </button>
          </div>
        )}
        <button
          className="rounded-lg border text-black bg-gray-300 mt-10 p-1 min-w-20"
          onClick={() => navigate("/home")}
        >
          Back
        </button>
      </div>

      {openModal && selectedExercise && (
        <StartWorkoutModal
          exercise={selectedExercise}
          setOpenModal={setOpenModal}
        />
      )}
    </div>
  );
};

export default NewWorkout;
