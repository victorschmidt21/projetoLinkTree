import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, ReactNode } from "react";
import { auth } from "../services/firebaseConnection";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  const [load, setLoad] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user?.uid,
          email: user?.email,
        };
        localStorage.setItem("@linktree", JSON.stringify(userData));
        setLoad(false);
        setSigned(true);
      } else {
        setLoad(false);
        setSigned(false);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  if (load) {
    return <></>;
  }
  if(!signed) {
    return <Navigate to="/login"></Navigate>
  }

  return children;
}
