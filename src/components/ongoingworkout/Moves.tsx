import { useEffect } from "react";
import { useMovesByExercise } from "../../hooks/queries/useMovesByExercise";
import { useWorkoutStore } from "../../store/workoutStore";

type MovesProps = {
  exerciseId: number;
};

const Moves = ({ exerciseId }: MovesProps) => {
  const { data: movesData, error: movesError } = useMovesByExercise(exerciseId);
  const setMoves = useWorkoutStore((state) => state.setMoves);
  const currentMoveIndex = useWorkoutStore((state) => state.currentMoveIndex);
  const moves = useWorkoutStore((state) => state.moves);

  if (movesError) {
    throw movesError;
  }

  useEffect(() => {
    if (movesData) {
      setMoves(movesData);
    }
  }, [movesData, setMoves]);

  if (!moves || moves.length === 0) {
    return <div>Loading next move...</div>;
  }

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
    </div>
  );
};

export default Moves;
