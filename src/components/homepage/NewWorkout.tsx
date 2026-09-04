import { useNavigate } from "react-router-dom";

const NewWorkout = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="border rounded-lg p-2 bg-green-400 text-white font-bold cursor-pointer"
        onClick={() => navigate("/newworkout")}
      >
        Start New
      </button>
    </div>
  );
};

export default NewWorkout;
