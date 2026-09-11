import { useState } from "react";
import { useWorkoutStore } from "../../store/workoutStore";
import { useSaveSet } from "../../hooks/mutations/useSaveSet";
import type { Workout } from "../../types/workout";

type FormProps = {
  setWorkoutDone: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  latestWorkout: Workout | undefined;
};

const SetForm = ({
  setWorkoutDone,
  setOpenModal,
  latestWorkout,
}: FormProps) => {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const nextMove = useWorkoutStore((state) => state.nextMove);
  const nextSet = useWorkoutStore((state) => state.nextSet);
  const saveSetMutation = useSaveSet();
  const currentSetNumber = useWorkoutStore((state) => state.currentSetNumber);
  const [notes, setNotes] = useState<string>("");
  const resetSet = useWorkoutStore((state) => state.resetSet);
  const moves = useWorkoutStore((state) => state.moves);
  const currentMoveIndex = useWorkoutStore((state) => state.currentMoveIndex);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (weight.length === 0 || reps.length === 0) {
      setOpenModal(true);
    } else if (latestWorkout) {
      saveSetMutation.mutate(
        {
          workout_id: latestWorkout.id,
          weight: Number(weight),
          reps: Number(reps),
          set_number: currentSetNumber,
          moves_id: moves[currentMoveIndex].id,
          notes: notes,
        },
        {
          onSuccess: () => {
            setWeight("");
            setReps("");
            setNotes("");
            if (currentSetNumber === moves[currentMoveIndex].sets) {
              if (currentMoveIndex + 1 == moves.length) {
                setWorkoutDone(true);
                resetSet();
              } else {
                nextMove();
              }
            } else {
              resetSet();
              nextSet();
            }
          },
        },
      );
    }
  };
  return (
    <div className="flex flex-col items-center">
      <p>Set {currentSetNumber}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <p>Weight</p>
        <input
          type="text"
          inputMode="decimal"
          value={weight}
          placeholder="Enter a number"
          className="border text-black bg-white"
          onChange={(e) => setWeight(e.target.value.replace(/[^0-9.]/g, ""))}
        />
        <p>Reps</p>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Enter a Number"
          value={reps}
          className="border text-black bg-white"
          onChange={(e) => setReps(e.target.value.replace(/[^0-9]/g, ""))}
        />
        <p>Notes</p>
        <textarea
          value={notes}
          className="border text-black bg-white min-h-30"
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="border bg-black text-white rounded-lg p-2 mt-5"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default SetForm;
