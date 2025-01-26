import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/input";
import { db } from "../../services/firebaseConnection";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

export function Network() {
  const [insta, setInsta] = useState("");
  const [link, setLink] = useState("");
  const [git, setGit] = useState("");

  useEffect(() => {
    function loadSocial() {
      const docRef = doc(db, "social", "networks");
      getDoc(docRef).then((doc) => {
        if (doc !== undefined) {
          setInsta(doc.data()?.instagram);
          setGit(doc.data()?.github);
          setLink(doc.data()?.linkedin);
        }
      });
    }
    loadSocial();
  }, []);

  function handleForm(e: FormEvent) {
    e.preventDefault();
    if (git === "" || link === "" || insta === "") {
      toast.error("Preencha todos os campos!");
      return;
    } else {
      setDoc(doc(db, "social", "networks"), {
        instagram: insta,
        linkedin: link,
        github: git,
      })
        .then(() => {
          toast.success("Links salvos com sucesso!");
        })
        .catch((error) => {
          toast.error("Erro ao salvar links!");
          console.log(error);
        });
    }
  }

  return (
    <div className="flex flex-col items-center mx-2">
      <Header />
      <h1 className="mt-4 text-white font-bold text-2xl">
        Minhas redes sociais
      </h1>
      <form className="flex flex-col max-w-lg w-full" onSubmit={handleForm}>
        <label className="text-white font-medium mt-4">Instagram</label>
        <Input
          placeholder="Digite o link do instagram"
          value={insta}
          onChange={(e) => setInsta(e.target.value)}
        />
        <label className="text-white font-medium mt-4">Linkedin</label>
        <Input
          placeholder="Digite o link do instagram"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <label className="text-white font-medium mt-4">GitHub</label>
        <Input
          placeholder="Digite o link do instagram"
          value={git}
          onChange={(e) => setGit(e.target.value)}
        />
        <button
          className="bg-indigo-600 mt-8 py-1 rounded-md text-white font-medium"
          type="submit"
        >
          Salvar Links
        </button>
      </form>
    </div>
  );
}
