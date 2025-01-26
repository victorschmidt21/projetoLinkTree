import { useEffect, useState } from "react";
import { SocialMedia } from "../../components/SocialMedia";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

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
      <h1 className="font-bold text-white md:text-4xl text-3xl">
        Victor Schmidt
      </h1>
      <span className="mt-5 text-indigo-100">Veja meus links</span>
      <main className="mt-4 flex flex-col w-11/12 justify-center max-w-xl items-center text-center">
        {links?.map((link) => (
          <section
            key={link.id}
            className="mt-4 w-full py-2 px-4 rounded-md select-none transition-transform cursor-pointer hover:scale-105"
            style={{ backgroundColor: link.bg }}
          >
            <a href={link.url} target="_blank">
              <p className="font-bold md:text-lg" style={{ color: link.color }}>
                {link.name}
              </p>
            </a>
          </section>
        ))}
      </main>
      {social &&
        Object.keys(social).length > 0 &&
          (
            <footer className="flex mt-4 gap-4">
              <SocialMedia url={social?.linkedin}>
                <FaLinkedin size={40} color="#fff" />
              </SocialMedia>
              <SocialMedia url={social?.github}>
                <FaGithub size={40} color="#fff" />
              </SocialMedia>
              <SocialMedia url={social?.instagram}>
                <FaInstagram size={40} color="#fff" />
              </SocialMedia>
            </footer>
          )}
    </div>
  );
}
