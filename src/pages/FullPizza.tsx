import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PizzaType } from "../redux/slices/pizzasSlice"

export const FullPizza = () => {
	const [pizza, setPizza] = useState<PizzaType | null>(null)
	const {id} = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		const fetchPizza = async () => {
			try {
				const {data} = await axios.get(`https://6318c23ef6b281877c75d9b1.mockapi.io/items/${id}`)
				setPizza(data)
			} catch (error) {
				alert('Ошибка при получении пиццы!')
				navigate('/')
			}
		}

		fetchPizza()
	}, [id])

	if (!pizza) {
		return <div>Загрузка...</div>
	}

	return (
		<div className="container">
			<img src={pizza.imageUrl} alt={pizza.title} />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price} ₽</h4>
		</div>
	)
}
