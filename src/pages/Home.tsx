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
import { fetchPizzas } from "../redux/slices/pizzasSlice"
import { AppDispatch, RootState } from "../redux/store"

export const Home: FC = () => {
	const itemsLimit = 4
	
	const isSearch = useRef<boolean>(false)
	const isMounted = useRef<boolean>(false)

	const categoryId = useSelector((state: RootState) => state.filter.categoryId)
	const sortProperty = useSelector((state: RootState) => state.filter.sort.sortProperty)
	const currentPage = useSelector((state: RootState) => state.filter.currentPage)
	const {items, itemsCount, status} = useSelector((state: RootState) => state.pizzas)

	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()

	const {searchValue} = useContext(SearchContext)

	const onChangePage = (value: number) => {
		dispatch(setCurrentPage(value))
	}

	const onChangeCategory = (value: number) => {
		dispatch(setCategoryId(value))
		dispatch(setCurrentPage(1))
	}

	const getPizzas = async () => {
		const sortBy = sortProperty.replace('-', '')
		const order = sortProperty.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `&category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		dispatch(fetchPizzas({sortBy, order, category, search, currentPage, itemsLimit}))
		
		window.scrollTo(0, 0)
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

		if (!isSearch.current) getPizzas()
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
				{status === 'loading' &&
					[...new Array(itemsLimit)].map((_, key) => 
						<Skeleton key={key} />
					)
				}
				{status === 'success' &&
					items.map(pizza => <PizzaBlock key={pizza.id} id={pizza.id} title={pizza.title} price={pizza.price} imageUrl={pizza.imageUrl} sizes={pizza.sizes} types={pizza.types} />)
				}
				{status === 'error' &&
					<div className="content__error-info">
						<h2>Произошла ошибка</h2>
						<p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже</p>
					</div>
				}
		  </div>
			<Pagination itemsLimit={itemsLimit} itemsCount={itemsCount} currentPage={currentPage} onChangePage={number => onChangePage(number)} />
		</div>
  )
}