import { useEffect, useState } from "react"
import { Categories } from "../components/Categories"
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock"
import { Skeleton } from "../components/PizzaBlock/Skeleton"
import { Sort } from "../components/Sort"

type ItemsType = {
	id: number
	imageUrl: string
	title: string
	types: Array<number>
	sizes: Array<number>
	price: number
	category: number
	rating: number
}

export const Home = () => {
  const [items, setItems] = useState<Array<ItemsType>>([])
	const [isLoading, setIsloading] = useState(true)

	useEffect(() => {
		fetch('https://63085e6b722029d9ddcd2b4a.mockapi.io/items').then(response => response.json()).then(json => {
			setItems(json)
			setIsloading(false)
		})
	}, [])

  return (
    <>
      <div className="content__top">
		  	<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading &&
					[...new Array(12)].map((_, key) => 
						<Skeleton key={key} />
					)
				}
				{!isLoading &&
					items.map(pizza =>
						<PizzaBlock key={pizza.id} title={pizza.title} price={pizza.price} imageUrl={pizza.imageUrl} sizes={pizza.sizes} types={pizza.types} />
					)
				}
		  </div>
    </>
  )
}