import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";

interface ButtonPreviewProps {
  name: string;
  bg: string;
  color: string;
  id: string;
}

async function handleDelete(id: string) {
  const docRef = doc(db, "links", id);
  await deleteDoc(docRef);
  toast.success("Link deletado com sucesso!");
}

export function ButtonPreview({ name, bg, color, id }: ButtonPreviewProps) {
  return (
    <div className=" max-w-lg w-full flex flex-col">
      <article
        className="flex justify-between w-full py-2 px-4 rounded-md mt-4 font-medium select-none"
        style={{ backgroundColor: bg, color: color }}
      >
        <p>{name}</p>
        <button onClick={() => handleDelete(id)} className="select-none">
          <FiTrash size={20} />
        </button>
      </article>
    </div>
  );
}
