import { useEffect } from "react";
import { useMovesByExercise } from "../../hooks/queries/useMovesByExercise";
import { useWorkoutStore } from "../../store/workoutStore";
import { usePreviousInfo } from "../../hooks/queries/usePreviousInfo";

type MovesProps = {
  exerciseId: number;
};

const Moves = ({ exerciseId }: MovesProps) => {
  const { data: movesData, error: movesError } = useMovesByExercise(exerciseId);
  const setMoves = useWorkoutStore((state) => state.setMoves);
  const currentMoveIndex = useWorkoutStore((state) => state.currentMoveIndex);
  const moves = useWorkoutStore((state) => state.moves);
  const currentMove = moves?.[currentMoveIndex];

  const { data: previousData, error: previousError } = usePreviousInfo(
    currentMove?.name ?? "",
  );

  if (movesError) {
    throw movesError;
  }
  if (previousError) {
    throw previousError;
  }

  useEffect(() => {
    if (movesData) {
      setMoves(movesData);
    }
  }, [movesData, setMoves]);

  if (!moves || moves.length === 0) {
    return <div>Loading next move...</div>;
  }

  const previousMove = previousData?.at(0);

  return (
    <div className="flex flex-col items-center">
      <p>
        Move {currentMoveIndex + 1}/{moves.length}
      </p>
      <div className="flex gap-3 items-center">
        <p className="font-bold">{moves[currentMoveIndex].name}</p>
        <p className="text-sm">
          {moves[currentMoveIndex].sets} x {moves[currentMoveIndex].reps}
        </p>
      </div>
      <div className="flex flex-col items-center bg-[#273c6f] p-2 m-2">
        <div className="flex items-center justify-center gap-2">
          <p className="text-xs">previous</p>
          <p className="text-xs">
            {previousMove?.workout.finished_at &&
              new Date(previousMove.workout.finished_at).toLocaleDateString(
                "fi-FI",
              )}
          </p>
        </div>

        <p className="text-sm font-bold">{previousData?.at(0)?.weight} kg</p>

        <div className="flex gap-3 text-sm">
          {previousData?.map((setti) => (
            <div key={setti.id}>
              <p>
                set {setti.set_number} : {setti.reps} reps
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Moves;
