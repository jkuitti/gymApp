import { useNavigate } from "react-router-dom";

const NewWorkoutButton = () => {
  const navigate = useNavigate();

  return (
    <div
      className="text-white border rounded-lg p-2 mt-10"
      onClick={() => navigate("/newexercise")}
    >
      Add new exercise
    </div>
  );
};

export default NewWorkoutButton;
