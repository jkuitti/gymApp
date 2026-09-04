import { useNavigate } from "react-router-dom";

const ExercisesButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="border rounded-lg p-2 bg-gray-400 text-white font-bold cursor-pointer"
        onClick={() => navigate("/exercises")}
      >
        Exercises
      </button>
    </div>
  );
};

export default ExercisesButton;
