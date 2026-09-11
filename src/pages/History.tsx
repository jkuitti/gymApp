import { useNavigate } from "react-router-dom";
import { useWorkouts } from "../hooks/queries/useWorkouts";
import Workoutinfo from "../components/history/WorkoutInfo";

const History = () => {
  const navigate = useNavigate();

  const { data, error } = useWorkouts();

  if (error) {
    throw error;
  }

  return (
    <div className="text-white mt-10 flex flex-col justify-center items-center">
      <p className="mb-10">History</p>
      <div className="flex flex-col gap-4">
        {data?.map((workout) => (
          <Workoutinfo workout={workout} key={workout.id} />
        ))}
      </div>
      <button
        onClick={() => navigate("/home")}
        className="border rounded-lg bg-black text-center p-1 min-w-20 mt-10"
      >
        Back
      </button>
    </div>
  );
};

export default History;
