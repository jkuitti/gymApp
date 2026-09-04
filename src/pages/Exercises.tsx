import NewExerciseButton from "../components/exercises/NewExerciseButton";
import { useNavigate } from "react-router-dom";
import { useExercises } from "../hooks/queries/useExercises";
import ExerciseCard from "../components/exercises/ExerciseCard";

const Exercises = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useExercises();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading exercises</div>;
  }

  return (
    <div className="text-white flex flex-col gap-4 mt-10">
      Exercises
      <div className="flex flex-col gap-4">
        {!data || data.length === 0 ? (
          <div> no exercises </div>
        ) : (
          data.map((exercise) => <ExerciseCard exercise={exercise} />)
        )}
      </div>
      <NewExerciseButton />
      <button
        className="text-white border rounded-lg p-2"
        onClick={() => navigate("/home")}
      >
        Back
      </button>
    </div>
  );
};

export default Exercises;
