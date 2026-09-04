import { useMovesByExercise } from "../../hooks/queries/useMovesByExercise";

type moveProps = {
  exerciseId: number;
};

const Moves = ({ exerciseId }: moveProps) => {
  const { data, isLoading, error } = useMovesByExercise(exerciseId);

  if (isLoading) {
    return <div>Moves are loading...</div>;
  }

  if (error) {
    return <div>Error loading moves</div>;
  }

  return (
    <div>
      {!data || data.length === 0 ? (
        <div className="text-white">No moves in this exercise</div>
      ) : (
        <div className="flex flex-col gap-3">
          {data.map((move) => (
            <div className="text-white flex gap-3 items-center" key={move.id}>
              <p className="font-bold">{move.name}</p>
              <p>
                {move.sets} x {move.reps}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Moves;
