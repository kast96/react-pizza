import { FC } from 'react'
import ReactPaginate from 'react-paginate'
import s from './Pagination.module.scss'

type PropsType = {
	itemsLimit: number
	itemsCount: number
	currentPage: number
	onChangePage: (number: number) => void
}

export const Pagination: FC<PropsType> = ({itemsLimit, itemsCount, currentPage, onChangePage}) => {
	return (
		<ReactPaginate
			className={s.root}
			breakLabel="..."
			nextLabel=">"
			previousLabel="<"
			onPageChange={e => onChangePage(e.selected + 1)}
			pageRangeDisplayed={itemsLimit}
			pageCount={Math.ceil(itemsCount / itemsLimit)}
			forcePage={currentPage - 1}
		/>
	)
}