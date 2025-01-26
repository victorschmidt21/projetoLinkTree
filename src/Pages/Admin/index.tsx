import { FormEvent, useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/input";
import { ButtonPreview } from "../../components/ButtonPreview";
import { db } from "../../services/firebaseConnection";
import { addDoc, collection, query, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";

interface linkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nameLink, setNameLink] = useState("");
  const [url, setUrl] = useState("");
  const [color, setColor] = useState("#000");
  const [bgColor, setBgColor] = useState("#fff");
  const [links, setLinks] = useState<linkProps[]>();

  useEffect(() => {
    const linkRef = collection(db, "links");
    const queryRef = query(linkRef);
    const unsub = onSnapshot(queryRef, (snapshot) => {
      let array: linkProps[] = [];
      snapshot.forEach((link) => {
        array.push({
          id: link.id,
          name: link.data().name,
          url: link.data().url,
          bg: link.data().bg,
          color: link.data().color,
        });
      });
      setLinks(array);
    });
    return () => {
      unsub();
    };
  }, []);

  function handleForm(e: FormEvent) {
    e.preventDefault();
    if (nameLink === "" || url === "") {
      toast.error("Preencha todos os campos!");
      return;
    }
    addDoc(collection(db, "links"), {
      name: nameLink,
      url: url,
      bg: bgColor,
      color: color,
      create: new Date(),
    })
      .then(() => {
        toast.success("Link cadastrado com sucesso!");
        setNameLink("");
        setUrl("");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao cadastrar Link!");
      });
  }

  return (
    <div className="flex flex-col justify-center items-center mx-4">
      <Header />
      <form
        className="flex flex-col mt-8 max-w-lg w-full"
        onSubmit={handleForm}
      >
        <label className="text-white font-medium">Nome do link</label>
        <Input
          value={nameLink}
          placeholder="Digite o nome do link"
          onChange={(e) => setNameLink(e.target.value)}
        />
        <label className="text-white font-medium mt-2">Url</label>
        <Input
          value={url}
          placeholder="Digite a url"
          type="url"
          onChange={(e) => setUrl(e.target.value)}
        />
        <section className="mt-4 space-x-4 flex">
          <div className="space-x-2">
            <label className="text-white font-medium">Cor do link</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="space-x-2">
            <label className="text-white font-medium ">Fundo do link</label>
            <input
              type="color"
              onChange={(e) => setBgColor(e.target.value)}
              value={bgColor}
            />
          </div>
        </section>
        {nameLink != "" && (
          <section className="mt-4 border-2 border-white w-full rounded-md flex flex-col justify-center items-center p-4">
            <label className="text-white font-medium">Preview:</label>
            <article
              className="w-full p-2 text-center mt-2 rounded-md font-medium"
              style={{ color: color, background: bgColor }}
            >
              {nameLink}
            </article>
          </section>
        )}
        <button
          className="bg-indigo-600 mt-4 text-white p-2 rounded-md font-medium"
          type="submit"
        >
          Cadastrar
        </button>
      </form>

      <h2 className="text-white font-bold text-2xl mt-6">Meus Links</h2>
      {links?.map((link) => (
        <ButtonPreview
          id={link.id}
          name={link.name}
          bg={link.bg}
          color={link.color}
        />
      ))}
    </div>
  );
}
