import { useEffect, useState } from "react";
import { SocialMedia } from "../../components/SocialMedia";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import imgHome from "../../../public/images/imgHome.png";
import { Footer } from "../../components/Footer";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialProps {
  instagram: string;
  linkedin: string;
  github: string;
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>();
  const [social, setSocial] = useState<SocialProps>();
  useEffect(() => {
    function loadSocial() {
      const docRef = doc(db, "social", "networks");
      getDoc(docRef).then((doc) => {
        const social: SocialProps = {
          instagram: doc.data()?.instagram,
          linkedin: doc.data()?.linkedin,
          github: doc.data()?.github,
        };
        setSocial(social);
      });
    }
    loadSocial();
  }, []);

  useEffect(() => {
    function loadLinks() {
      const linkRef = collection(db, "links");
      getDocs(linkRef).then((snap) => {
        const array: LinkProps[] = [];
        snap.forEach((doc) => {
          array.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
          });
        });
        setLinks(array);
      });
    }
    loadLinks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-4 mt-10">
      <div className="flex flex-col justify-center items-center text-white text-center">
        <div className="h-40 w-40">
          <img src={imgHome} />
        </div>
        <h1 className="font-bold text-white md:text-2xl text-2xl mt-4">
          Victor Schmidt
        </h1>
        <span className="mt-4">
          Sempre aprendendo, sempre codando — bem-vindo ao meu universo dev.
        </span>
      </div>

      {social && Object.keys(social).length > 0 && (
        <div className="flex mt-5 gap-4">
          <SocialMedia url={social?.linkedin}>
            <FaLinkedin size={28} color="#FEFEFE" />
          </SocialMedia>
          <SocialMedia url={social?.github}>
            <FaGithub size={28} color="#FEFEFE" />
          </SocialMedia>
          <SocialMedia url={social?.instagram}>
            <FaInstagram size={28} color="#FEFEFE" />
          </SocialMedia>
        </div>
      )}
      <span className="mt-5 text-indigo-100">Alguns de meus projetos: </span>
      <main className="mt-4 flex flex-col w-11/12 justify-center max-w-xl items-center text-center">
        {links?.map((link) => (
          <section
            key={link.id}
            className="mt-4 w-full py-2 px-4 rounded-md select-none transition-transform cursor-pointer bg-gradient-to-r from-[#FD6F00]  to-[#CA5900]"
          >
            <a href={link.url} target="_blank">
              <p className="font-bold md:text-lg text-white">
                {link.name}
              </p>
            </a>
          </section>
        ))}
      </main>
      <Footer/>
    </div>
  );
}
