import { FC, useEffect, useState } from "react"
import { Categories } from "../components/Categories"
import { Pagination } from "../components/Pagination/Pagination"
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

type PropsType = {
	searchValue: string
}

export const Home: FC<PropsType> = ({searchValue}) => {
  const [items, setItems] = useState<Array<ItemsType>>([])
	const [isLoading, setIsloading] = useState(true)
	const [categotyId, setCategoryId] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)
	const [sortType, setSortType] = useState<SortType>({
		name: 'популярности',
		sortProperty: 'rating',
	})
	const itemsLimit = 4
	const [itemsCount, setItemsCount] = useState(0)

	useEffect(() => {
		setIsloading(true)

		const sortBy = sortType.sortProperty.replace('-', '')
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
		const category = categotyId > 0 ? `&category=${categotyId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		fetch(`https://63085e6b722029d9ddcd2b4a.mockapi.io/items?page=${currentPage}&limit=${itemsLimit}${category}&sortBy=${sortBy}&order=${order}${search}`).then(response => response.json()).then(json => {
			setItems(json.items)
			setItemsCount(json.count)
			setIsloading(false)
		})
	}, [categotyId, sortType, searchValue, currentPage])

  return (
    <div className="container">
      <div className="content__top">
		  	<Categories value={categotyId} onClickCategory={(index: number) => setCategoryId(index)} />
				<Sort value={sortType} onChangeSort={(sortType: SortType) => setSortType(sortType)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading &&
					[...new Array(itemsLimit)].map((_, key) => 
						<Skeleton key={key} />
					)
				}
				{!isLoading &&
					items.map(pizza => <PizzaBlock key={pizza.id} title={pizza.title} price={pizza.price} imageUrl={pizza.imageUrl} sizes={pizza.sizes} types={pizza.types} />)
				}
		  </div>
			<Pagination itemsLimit={itemsLimit} itemsCount={itemsCount} onChangePage={number => setCurrentPage(number)} />
		</div>
  )
}