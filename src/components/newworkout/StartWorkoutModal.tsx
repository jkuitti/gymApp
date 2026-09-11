import { useNavigate } from "react-router-dom";
import type { Exercise } from "../../types/exercise";
import { useCreateWorkout } from "../../hooks/mutations/useCreateWorkout";
import { useCurrentUser } from "../../hooks/queries/useCurrentUser";
import { useWorkoutStore } from "../../store/workoutStore";

type StartProps = {
  exercise: Exercise;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const StartWorkoutModal = ({ exercise, setOpenModal }: StartProps) => {
  const resetWorkout = useWorkoutStore((store) => store.resetWorkout);
  const { data, error } = useCurrentUser();
  if (error) {
    throw error;
  }
  const navigate = useNavigate();
  const createWorkoutMutation = useCreateWorkout();

  const handleStart = () => {
    if (data) {
      createWorkoutMutation.mutate(
        {
          started_at: new Date(),
          exercise_id: exercise.id,
          user_id: data.id,
        },
        {
          onSuccess: () => {
            resetWorkout();
            navigate("/ongoingworkout", {
              state: {
                exerciseId: exercise.id,
              },
            });
          },
        },
      );
    }
  };

  return (
    <div>
      <div className="fixed bg-black/50 inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0" onClick={() => setOpenModal(false)} />

        <div
          className="relative z-10 w-full max-w-md border-[#424242] border-1 rounded-xl bg-black p-6 shadow-lg flex flex-col justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="mb-4 text-white text-xl font-bold text-center">
            {exercise.name}
          </h2>
          <button
            className="text-black bg-white border rounded-lg min-h-10"
            onClick={handleStart}
          >
            Start workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartWorkoutModal;
