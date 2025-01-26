import { Link } from "react-router-dom"

export function Error() {
    return(
        <div className="flex flex-col justify-center items-center mt-10 mx-4">
            <div className="bg-white rounded max-w-sm w-full py-8 px-2 flex flex-col justify-center items-center">
            <h1 className="font-bold text-2xl">Página não encontrada!</h1>
            <h2 className="font-medium text-xl">Error 404</h2>
            <Link to="/" className="mt-4 bg-indigo-800 py-2 px-4 rounded text-white">Voltar para a página Home</Link>
            </div>
        </div>
    )
}