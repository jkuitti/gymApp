import { useParams } from "react-router-dom";
import { useFullWorkoutDetails } from "../hooks/queries/useFullWorkoutDetails";
import { useNavigate } from "react-router-dom";

const Workout = () => {
  const { workoutid } = useParams();
  const navigate = useNavigate();
  const { data, error } = useFullWorkoutDetails(Number(workoutid));
  if (error) {
    throw error;
  }

  const workoutDate = data?.at(0)?.workout.started_at;

  return (
    <div className="text-white m-8 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <p className="text-white">Workout</p>
        <p className="text-sm">
          {workoutDate ? new Date(workoutDate).toLocaleDateString("fi-FI") : ""}
        </p>
      </div>

      {data?.map((workout) => (
        <div key={workout.id} className="flex flex-col items-center">
          {workout.set_number === 1 && (
            <div className="flex flex-col items-center mb-2">
              <p className="mt-5">
                {workout.move.name} {workout.move.sets} x {workout.move.reps}
              </p>
              <p>{workout.weight}kg</p>
            </div>
          )}
          <p>
            set {workout.set_number} - {workout.reps} reps
          </p>
        </div>
      ))}
      <button
        className="rounded-lg border text-white bg-black p-2 mt-5 min-w-30"
        onClick={() => navigate("/history")}
      >
        Back
      </button>
    </div>
  );
};

export default Workout;
