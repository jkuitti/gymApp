import { useLocation } from "react-router-dom";
import { useMovesByExercise } from "../hooks/queries/useMovesByExercise";
import { useWorkoutStore } from "../store/workoutStore";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertModal from "../components/ongoingworkout/AlertModal";
import { useSaveSet } from "../hooks/mutations/useSaveSet";
import { useLatestWorkout } from "../hooks/queries/useLatestWorkout";
import { useFinishWorkout } from "../hooks/mutations/useFinishWorkout";

const OnGoingworkout = () => {
  const location = useLocation();
  const exerciseId = location.state.exerciseId;
  const setMoves = useWorkoutStore((state) => state.setMoves);
  const moves = useWorkoutStore((state) => state.moves);
  const currentMoveIndex = useWorkoutStore((state) => state.currentMoveIndex);
  const nextMove = useWorkoutStore((state) => state.nextMove);
  const nextSet = useWorkoutStore((state) => state.nextSet);
  const resetSet = useWorkoutStore((state) => state.resetSet);
  const currentSetNumber = useWorkoutStore((state) => state.currentSetNumber);
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [notes, setNotes] = useState<string>("");
  const resetWorkout = useWorkoutStore((state) => state.resetWorkout);
  const navigate = useNavigate();
  const [workoutDone, setWorkoutDone] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const saveSetMutation = useSaveSet();
  const finishWorkoutMutation = useFinishWorkout();

  const { data: movesData, error: movesError } = useMovesByExercise(exerciseId);
  const { data: latestWorkout, error: latestWorkoutError } = useLatestWorkout();

  if (movesError || latestWorkoutError) {
    throw movesError;
  }

  useEffect(() => {
    if (movesData) {
      setMoves(movesData);
    }
  }, [movesData, setMoves]);

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
              } else {
                nextMove();
                resetSet();
              }
            } else {
              nextSet();
            }
          },
        },
      );
    }
  };

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
            resetSet();
            resetWorkout();
            navigate("/home");
          },
        },
      );
    }
  };

  if (!moves || moves.length === 0) {
    return <div>Loading next move...</div>;
  }

  return (
    <div className="text-white flex gap-3 items-center mt-10 flex-col">
      {!workoutDone ? (
        <div className="text-white flex gap-3 items-center mt-10 flex-col">
          <p>
            Move {currentMoveIndex + 1}/{moves.length}
          </p>
          <div className="flex gap-3 items-center">
            <p className="font-bold">{moves[currentMoveIndex].name}</p>
            <p className="text-sm">
              {moves[currentMoveIndex].sets} x {moves[currentMoveIndex].reps}
            </p>
          </div>
          <p>Set {currentSetNumber}</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <p>Weight</p>
            <input
              type="text"
              inputMode="decimal"
              value={weight}
              placeholder="Enter a number"
              className="border text-black bg-white"
              onChange={(e) =>
                setWeight(e.target.value.replace(/[^0-9.]/g, ""))
              }
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
          {openModal && <AlertModal setOpenModal={setOpenModal} />}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default OnGoingworkout;
