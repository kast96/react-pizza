import { FC } from "react"

type PropsType = {
	value: number
	onClickCategory: (index: number) => void
}

export const Categories: FC<PropsType> = ({value, onClickCategory}) => {
	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

	return (
		<div className="categories">
			<ul>
				{categories.map((categoryName, key) => 
					<li key={key} className={key === value ? 'active' : ''} onClick={() => onClickCategory(key)}>{categoryName}</li>
				)}
			</ul>
		</div>
	)
}