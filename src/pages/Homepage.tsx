import NewExercise from "../components/homepage/NewExercise"
import HistoryButton from "../components/homepage/HistoryButton"
import WorkoutsButton from "../components/homepage/WorkoutsButton"

const Homepage = () => {
    return (
        <div className="flex flex-col gap-5 justify-center items-center m-10">
            <h1 className="text-3xl font-bold text-white">Gym</h1>
            <NewExercise />
            <WorkoutsButton />
            <HistoryButton />
            
        </div>
    )
}
export default Homepage