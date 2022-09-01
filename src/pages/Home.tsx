import { FC, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SearchContext } from "../App"
import { Categories } from "../components/Categories"
import { Pagination } from "../components/Pagination/Pagination"
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock"
import { Skeleton } from "../components/PizzaBlock/Skeleton"
import { Sort } from "../components/Sort"
import { setCategoryId } from "../redux/slices/filterSlice"
import { RootState } from "../redux/store"

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

export const Home: FC = () => {
  const [items, setItems] = useState<Array<ItemsType>>([])
	const [isLoading, setIsloading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const itemsLimit = 4
	const [itemsCount, setItemsCount] = useState(0)

	const categotyId = useSelector((state: RootState) => state.filter.categoryId)
	const sortProperty = useSelector((state: RootState) => state.filter.sort.sortProperty)
	const dispatch = useDispatch()

	const {searchValue} = useContext(SearchContext)

	useEffect(() => {
		setIsloading(true)

		const sortBy = sortProperty.replace('-', '')
		const order = sortProperty.includes('-') ? 'asc' : 'desc'
		const category = categotyId > 0 ? `&category=${categotyId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		fetch(`https://63085e6b722029d9ddcd2b4a.mockapi.io/items?page=${currentPage}&limit=${itemsLimit}${category}&sortBy=${sortBy}&order=${order}${search}`).then(response => response.json()).then(json => {
			setItems(json.items)
			setItemsCount(json.count)
			setIsloading(false)
		})
	}, [categotyId, sortProperty, searchValue, currentPage])

  return (
    <div className="container">
      <div className="content__top">
		  	<Categories value={categotyId} onClickCategory={(index: number) => dispatch(setCategoryId(index))} />
				<Sort />
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