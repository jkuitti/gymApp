import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkoutStore } from "../../store/workoutStore";
import { useFinishWorkout } from "../../hooks/mutations/useFinishWorkout";
import type { Workout } from "../../types/workout";

type EndWorkoutProps = {
  latestWorkout: Workout | undefined;
};

const EndWorkout = ({ latestWorkout }: EndWorkoutProps) => {
  const [notes, setNotes] = useState<string>("");
  const resetWorkout = useWorkoutStore((state) => state.resetWorkout);
  const navigate = useNavigate();
  const finishWorkoutMutation = useFinishWorkout();

  const handleFinish = () => {
    if (latestWorkout) {
      finishWorkoutMutation.mutate(
        {
          endWorkout: {
            finished_at: new Date(),
            notes: notes,
            status: "finished",
          },
          workoutId: latestWorkout.id,
        },
        {
          onSuccess: () => {
            resetWorkout();
            navigate("/home");
          },
        },
      );
    }
  };
  return (
    <div className="text-white flex flex-col items-center mt-10">
      <p className="text-xl">Workout Done !</p>
      <textarea
        className="border text-black bg-white min-h-30"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      ></textarea>
      <button
        className="border bg-black text-white rounded-lg p-2 mt-5"
        onClick={handleFinish}
      >
        Finish
      </button>
      <button className="border bg-black text-white rounded-lg p-2 mt-5">
        Back
      </button>
    </div>
  );
};

export default EndWorkout;
