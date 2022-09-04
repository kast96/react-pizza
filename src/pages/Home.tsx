import axios from "axios"
import qs from "qs"
import { FC, useContext, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { SearchContext } from "../App"
import { Categories } from "../components/Categories"
import { Pagination } from "../components/Pagination/Pagination"
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock"
import { Skeleton } from "../components/PizzaBlock/Skeleton"
import { Sort, sortList } from "../components/Sort"
import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice"
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
	const itemsLimit = 4
	
  const [items, setItems] = useState<Array<ItemsType>>([])
	const [isLoading, setIsloading] = useState(true)
	const [itemsCount, setItemsCount] = useState(0)
	const isSearch = useRef<boolean>(false)
	const isMounted = useRef<boolean>(false)

	const categoryId = useSelector((state: RootState) => state.filter.categoryId)
	const sortProperty = useSelector((state: RootState) => state.filter.sort.sortProperty)
	const currentPage = useSelector((state: RootState) => state.filter.currentPage)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {searchValue} = useContext(SearchContext)

	const onChangePage = (value: number) => {
		dispatch(setCurrentPage(value))
	}

	const onChangeCategory = (value: number) => {
		dispatch(setCategoryId(value))
		dispatch(setCurrentPage(1))
	}

	const fetchPizzas = () => {
		setIsloading(true)

		const sortBy = sortProperty.replace('-', '')
		const order = sortProperty.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `&category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		axios
			.get(`https://63085e6b722029d9ddcd2b4a.mockapi.io/items?page=${currentPage}&limit=${itemsLimit}${category}&sortBy=${sortBy}&order=${order}${search}`)
			.then((response) => {
				setItems(response.data.items)
				setItemsCount(response.data.count)
				setIsloading(false)
			})
	}

	// Если был первый первый рендер, то проверяем url параметер и сохраняем в redux
	useEffect(() => {
		if(window.location.search) {
			const params = qs.parse(window.location.search.substring(1))
			const sort =  sortList.find(item => item.sortProperty === params.sortProperty) || sortList[0]
			dispatch(setFilters({
				categoryId: Number(params.categoryId),
				currentPage: Number(params.currentPage),
				sort
			}))
			isSearch.current = true
		}
	}, [dispatch])

	// Если был первый рендер, то запрашиваем пиццы
	useEffect(() => {
		window.scrollTo(0, 0)

		if (!isSearch.current) fetchPizzas()
		isSearch.current = false

	}, [categoryId, sortProperty, searchValue, currentPage])

	// Если изменили параметры и был первый рендер
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				categoryId: categoryId,
				sortProperty: sortProperty,
				searchValue: searchValue,
				currentPage: currentPage,
			})
			
			navigate('?'+queryString)
		}
		isMounted.current = true
	}, [categoryId, sortProperty, searchValue, currentPage, navigate])

  return (
    <div className="container">
      <div className="content__top">
		  	<Categories value={categoryId} onClickCategory={onChangeCategory} />
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
					items.map(pizza => <PizzaBlock key={pizza.id} id={pizza.id} title={pizza.title} price={pizza.price} imageUrl={pizza.imageUrl} sizes={pizza.sizes} types={pizza.types} />)
				}
		  </div>
			<Pagination itemsLimit={itemsLimit} itemsCount={itemsCount} currentPage={currentPage} onChangePage={number => onChangePage(number)} />
		</div>
  )
}