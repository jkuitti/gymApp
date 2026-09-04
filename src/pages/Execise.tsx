import { useParams } from "react-router-dom";
import { useExerciseByID } from "../hooks/queries/useExerciseById";
import Moves from "../components/exercises/Moves";
import { useAddMove } from "../hooks/mutations/useAddMove";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Exercise = () => {
  const [moveName, setMoveName] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [sets, setSets] = useState<number>(0);
  const [add, setAdd] = useState<boolean>(false);

  const navigate = useNavigate();

  const addMoveMutation = useAddMove();

  const { exerciseid } = useParams();

  const { data, isLoading, error } = useExerciseByID(Number(exerciseid));

  if (isLoading) {
    return <div>Exercise is loading</div>;
  }

  if (error) {
    return <div>Error loading exercise</div>;
  }

  const handleNewMove = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    addMoveMutation.mutate(
      {
        name: moveName,
        reps: reps,
        sets: sets,
        exercise_id: Number(exerciseid),
      },
      {
        onSuccess: () => {
          setAdd(!add);
          setMoveName("");
          setReps("");
          setSets(0);
        },
      },
    );
  };

  return (
    <div className="text-white flex flex-col gap-2 justify-center items-center mt-10">
      <p>Exercise</p>
      <div className="font-bold text-lg">{data?.name}</div>
      <Moves exerciseId={Number(exerciseid)} />
      {!add ? (
        <div
          className="bg-[#1d2e54] border rounded-lg p-2 m-2"
          onClick={() => setAdd(!add)}
        >
          Add move
        </div>
      ) : (
        <div className="bg-[#1d2e54] border rounded-lg p-2 m-2">
          <form onSubmit={handleNewMove} className="flex flex-col gap-2">
            <p>Name of the move</p>
            <input
              type="text"
              onChange={(v) => setMoveName(v.target.value)}
              className="bg-white text-black border rounded-lg p-1"
            />
            <p>Reps</p>
            <input
              type="text"
              onChange={(v) => setReps(v.target.value)}
              className="bg-white text-black border rounded-lg p-1"
            />
            <p>Sets</p>
            <input
              type="text"
              onChange={(v) => setSets(Number(v.target.value))}
              className="bg-white text-black border rounded-lg p-1"
            />
            <button
              type="submit"
              className="rounded-lg border bg-[#0f172b] mt-2 p-2"
            >
              Add
            </button>
          </form>
          <button
            onClick={() => setAdd(!add)}
            className="mt-10 border bg-black rounded-lg p-2"
          >
            Cancel
          </button>
        </div>
      )}
      <button
        className="bg-[#1d2e54] border rounded-lg p-2 m-2"
        onClick={() => navigate("/exercises")}
      >
        Back
      </button>
    </div>
  );
};

export default Exercise;
