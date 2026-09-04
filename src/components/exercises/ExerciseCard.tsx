import type { Exercise } from "../../types/exercise";
import { useNavigate } from "react-router-dom";

type ExerciseCardProps = {
  exercise: Exercise;
};

const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="text-white border rounded-lg bg-[#1d2e54] flex justify-center min-h-15 items-center"
      onClick={() => navigate(`/exercises/${exercise.id}`)}
      key={exercise.id}
    >
      {exercise.name}
    </div>
  );
};

export default ExerciseCard;
