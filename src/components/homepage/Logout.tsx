import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    navigate("/");
  };

  return (
    <button
      className="border rounded-lg p-2 bg-black text-white font-bold cursor-pointer mt-10 text-sm"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
