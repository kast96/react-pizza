import { useEffect, useState } from 'react';
import './assets/scss/app.scss'
import { Categories } from './components/Categories';
import { Header } from './components/Header';
import { PizzaBlock } from './components/PizzaBlock';
import { Sort } from './components/Sort';

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

const App = () => {
  const [items, setItems] = useState<Array<ItemsType>>([])

  useEffect(() => {
    fetch('https://63085e6b722029d9ddcd2b4a.mockapi.io/items').then(response => response.json()).then(json => setItems(json))
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map(pizza => 
              <PizzaBlock key={pizza.id} title={pizza.title} price={pizza.price} imageUrl={pizza.imageUrl} sizes={pizza.sizes} types={pizza.types} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
