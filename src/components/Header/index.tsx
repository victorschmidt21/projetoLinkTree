import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
export function Header() {
  async function handleLogout() {
    await signOut(auth);
    localStorage.clear();
  }
  return (
    <header className="w-full max-w-3xl mx-auto">
      <nav className="w-full flex justify-between h-16 items-center border-b-2 mt-4 font-medium text-white px-4">
        <button onClick={handleLogout}>
          <BiLogOut size={30} />
        </button>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/admin">Links</Link>
          <Link to="/admin/network">Redes Sociais</Link>
        </div>
      </nav>
    </header>
  );
}
