import { useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import api from "../api.json"

export default function Local() {
	const { localId = "1" } = useParams()
	const getCurrentLocal = (localId: string) => api.response.stores.find(pizza => pizza.id === Number(localId))

	const getLocal = useMemo(() => getCurrentLocal(localId), [localId])

	if (getLocal) {
		return (
			<div className="min-h-screen bg-gray-100">
				<div className="container bg-left-image bg-no-repeat bg-cover min-h-[10rem] min-w-full relative bg-login">
					<figure className="absolute top-10 left-20">
						<img src={getLocal.logo} alt={`logo de ${getLocal.name}`} />
					</figure>
				</div>
				<section className="local-info w-[75%] my-0 mx-auto px-10 mt-4 flex justify-between">
					<ul>
						<span className="flex gap-2 items-center">
							<li className="text-3xl font-bold">{getLocal.name} </li>
							<li> - {getLocal.address}</li>
						</span>
						<li className="text-xl"> {getLocal.description}</li>
						<Link to="/lists" className="hover:border-b-4 hover:border-btn min-h-[2rem]">
							&larr; Volver a la lista
						</Link>
					</ul>
					<span className="invert flex gap-4">
						{getLocal.instagram && (
							<a href={getLocal.instagram} target="_blank">
								<img src="/icons/instagram.svg" alt={`${getLocal.name} instagram link`} className="w-10" />
							</a>
						)}
						{getLocal.facebook && (
							<a href={getLocal.facebook} target="_blank">
								<img src="/icons/facebook.svg" alt={`${getLocal.name} instagram link`} className="w-10" />
							</a>
						)}
					</span>
				</section>
				<div className="container mt-20 py-6 flex gap-4 flex-wrap justify-center w-full mx-auto">
					{getLocal.products.map(product => (
						<div key={product.id} className="bg-gray-200 rounded-xl flex h-[10rem] items-center max-w-[45%] min-w-[45%] hover:scale-[.98]">
							<span className="bg-gray-300 min-h-full">
								<img src={product.img} alt={product.name} className="object-cover rounded-full transition-all w-40 p-4" />
							</span>
							<p className="text-2xl font-bold p-5">{product.name}</p>
						</div>
					))}
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col justify-center items-center min-h-screen gap-4">
			<p className="text-3xl font-bold">El local no se pudo encontrar 🍕</p>
			<Link to="/lists" className="hover:border-b-4 hover:border-btn min-h-[2rem]">
				&larr; Volver a la lista
			</Link>
		</div>
	)
}