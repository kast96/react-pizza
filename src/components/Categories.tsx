import { useState } from "react"

export const Categories = () => {
	const [activeIndex, setActiveIndex] = useState(0)

	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

	const onClickCategory = (index: number) => () => {
		if (index === activeIndex) return
		setActiveIndex(index)
	}

	return (
		<div className="categories">
			<ul>
				{categories.map((category, key) => 
					<li key={key} className={key === activeIndex ? 'active' : ''} onClick={onClickCategory(key)}>{category}</li>
				)}
			</ul>
		</div>
	)
}