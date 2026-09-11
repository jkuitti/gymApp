import { useLocation } from "react-router-dom";
import { useState } from "react";
import AlertModal from "../components/ongoingworkout/AlertModal";
import { useLatestWorkout } from "../hooks/queries/useLatestWorkout";

import SetForm from "../components/ongoingworkout/SetForm";
import Moves from "../components/ongoingworkout/Moves";
import EndWorkout from "../components/ongoingworkout/EndWorkout";

const OnGoingworkout = () => {
  const location = useLocation();
  const exerciseId = location.state.exerciseId;

  const [workoutDone, setWorkoutDone] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { data: latestWorkout, error: latestWorkoutError } = useLatestWorkout();

  if (latestWorkoutError) {
    throw latestWorkoutError;
  }

  return (
    <div className="text-white flex gap-3 items-center mt-10 flex-col">
      {!workoutDone ? (
        <div className="text-white flex gap-3 items-center mt-10 flex-col">
          <Moves exerciseId={exerciseId} />
          <SetForm
            setWorkoutDone={setWorkoutDone}
            setOpenModal={setOpenModal}
            latestWorkout={latestWorkout}
          />
          {openModal && <AlertModal setOpenModal={setOpenModal} />}
        </div>
      ) : (
        <EndWorkout latestWorkout={latestWorkout} />
      )}
    </div>
  );
};

export default OnGoingworkout;
