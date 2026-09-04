import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateExercise } from "../hooks/mutations/useCreateExercise";

const NewExercise = () => {
  const [name, setName] = useState<string>("");

  const navigate = useNavigate();

  const createExerciseMutation = useCreateExercise();

  const handlesubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    createExerciseMutation.mutate(
      {
        name,
      },
      {
        onSuccess: () => navigate("/exercises"),
      },
    );
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center min-h-screen">
      <form onSubmit={handlesubmit} className="flex flex-col gap-3">
        <p className="text-white"> Name of the exercise</p>
        <input
          type="text"
          className="bg-gray-300"
          onChange={(e) => setName(e.target.value)}
        />
        <div className="text-white flex justify-center">
          <button>Save</button>
        </div>
      </form>
      <button className="text-white" onClick={() => navigate("/exercises")}>
        Cancel
      </button>
    </div>
  );
};

export default NewExercise;
