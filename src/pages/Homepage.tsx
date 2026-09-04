import NewWorkout from "../components/homepage/NewWorkout";
import HistoryButton from "../components/homepage/HistoryButton";
import ExercisesButton from "../components/homepage/ExercisesButton";

const Homepage = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center m-10">
      <h1 className="text-3xl font-bold text-white">Gym</h1>
      <NewWorkout />
      <ExercisesButton />
      <HistoryButton />
    </div>
  );
};
export default Homepage;
