import type { Workout } from "../../types/workout";
import { useNavigate } from "react-router-dom";

type workoutProps = {
  workout: Workout;
};

const Workoutinfo = ({ workout }: workoutProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="border-b flex flex-col gap-1 p-1 min-w-80 bg-[#16223e] justify-center items-center"
      onClick={() => navigate(`/history/${workout.id}`)}
    >
      <p>{workout.exercise.name} </p>
      <p>
        {workout.started_at &&
          new Date(workout.started_at).toLocaleDateString("fi-FI")}
      </p>
    </div>
  );
};

export default Workoutinfo;
