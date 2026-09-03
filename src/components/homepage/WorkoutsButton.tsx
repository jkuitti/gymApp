import { useNavigate } from "react-router-dom"


const WorkoutsButton = () => {

    const navigate = useNavigate()
    return (
        <div>
            <button className="border rounded-lg p-2 bg-gray-400 text-white font-bold cursor-pointer" onClick={() => navigate("/workouts")}>
                Workouts
            </button>
        </div>
    )
}

export default WorkoutsButton