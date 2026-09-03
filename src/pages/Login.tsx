import { useState, type FormEvent } from "react";
import { useLogin } from "../hooks/mutations/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginMutation = useLogin();

  const navigate = useNavigate();

  const handleLogin = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate(
      {
        email: email,
        password: password,
      },
      {
        onSuccess: () => {
          (setEmail(""), setPassword(""));
          navigate("/home");
        },
      },
    );
  };

  return (
    <div className="text-white flex flex-col">
      <form
        onSubmit={handleLogin}
        className="flex flex-col m-10 gap-5 justify-center items-center"
      >
        <p>Email</p>
        <input
          type="text"
          className="bg-gray-300 text-black"
          onChange={(v) => setEmail(v.target.value)}
        />
        <p>Password</p>
        <input
          type="text"
          className="bg-gray-300 text-black"
          onChange={(v) => setPassword(v.target.value)}
        />
        <button type="submit" className="font-bold text-2xl cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
