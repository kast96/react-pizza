import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './assets/scss/app.scss'
import { Header } from './components/Header'
import { Cart } from './pages/Cart'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

type InitialStateType = {
	searchValue: string
	setSearchValue: Dispatch<SetStateAction<string>>
}

export const SearchContext = createContext<InitialStateType>({searchValue: '', setSearchValue: () => {}})

const App = () => {
	const [searchValue, setSearchValue] = useState('')

	return (
		<div className="wrapper">
			<SearchContext.Provider value={{searchValue, setSearchValue}}>
				<Header />
				<div className="content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</SearchContext.Provider>
		</div>
	)
}

export default App