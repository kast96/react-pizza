import { FC } from 'react'
import ReactPaginate from 'react-paginate'
import s from './Pagination.module.scss'

type PropsType = {
	onChangePage: (number: number) => void
}

export const Pagination: FC<PropsType> = ({onChangePage}) => {
	return (
		<ReactPaginate
			className={s.root}
			breakLabel="..."
			nextLabel=">"
			previousLabel="<"
			onPageChange={e => onChangePage(e.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
		/>
	)
}