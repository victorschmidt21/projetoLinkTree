import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { FormEvent, useState } from "react";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";



export function Login({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleForm(e: FormEvent) {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Insira seus dados!");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Login Realizada com sucesso!");
        navigate("/admin")
      })
      .catch(() => {
        toast.error("Email/Senha estão incorretos!");
        return;
      });
  }
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <Link to="/">
        <h1 className=" text-white text-5xl  font-bold">
          Victor<span className="text-indigo-500">Dev</span>
        </h1>
      </Link>
      <form
        onSubmit={handleForm}
        className="flex flex-col w-full max-w-lg px-4 mt-10"
      >
        <Input
          placeholder="Digite seu email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Digite sua password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-indigo-950 mt-4 h-8 text-white rounded-md font-bold"
          type="submit"
        >
          Acessar
        </button>
      </form>
    </div>
  );
}
