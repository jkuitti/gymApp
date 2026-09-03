import { useWorkouts } from "../hooks/queries/useWorkouts";

const Workouts = () => {
  const { data, isLoading, error } = useWorkouts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading workouts</div>;
  }

  return (
    <div className="text-white">
      Workouts
      <div>
        {!data || data.length === 0 ? (
          <div> no workouts </div>
        ) : (
          data.map((workout) => <div key={workout.id}> {workout.user_id} </div>)
        )}
      </div>
    </div>
  );
};

export default Workouts;
