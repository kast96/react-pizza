import { useEffect, useState } from "react"
import { Categories } from "../components/Categories"
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock"
import { Skeleton } from "../components/PizzaBlock/Skeleton"
import { Sort, SortType } from "../components/Sort"

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
	const [categotyId, setCategoryId] = useState(0)
	const [sortType, setSortType] = useState<SortType>({
		name: 'популярности',
		sortProperty: 'rating',
	})

	useEffect(() => {
		setIsloading(true)

		const sortBy = sortType.sortProperty.replace('-', '')
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
		const category = categotyId > 0 ? `category=${categotyId}` : ''

		fetch(`https://63085e6b722029d9ddcd2b4a.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`).then(response => response.json()).then(json => {
			setItems(json)
			setIsloading(false)
		})
	}, [categotyId, sortType])

  return (
    <div className="container">
      <div className="content__top">
		  	<Categories value={categotyId} onClickCategory={(index: number) => setCategoryId(index)} />
				<Sort value={sortType} onChangeSort={(sortType: SortType) => setSortType(sortType)} />
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
		</div>
  )
}