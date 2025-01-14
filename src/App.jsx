import './App.css'
import { getData } from './constants/db'
import Card from './components/card/card'
import Cart from './components/cart/cart'
import { useEffect, useState } from 'react'

const coursses=getData()

const telegram = window.Telegram.WebApp;

function App() {
  const [cartItems, setCartItems]=useState([]);

  useEffect(()=>{
	telegram.ready()
  })

  const onAddItem = item => {
		const existItem = cartItems.find(c => c.id == item.id);

		if (existItem) {
			const newData = cartItems.map(c =>
				c.id == item.id
					? { ...existItem, quantity: existItem.quantity + 1 }
					: c
			);
			setCartItems(newData);
		} else {
			const newData = [...cartItems, { ...item, quantity: 1 }];
			setCartItems(newData);
		}
	};

	const onRemoveItem = item => {
		const existItem = cartItems.find(c => c.id == item.id);

		if (existItem.quantity === 1) {
			const newData = cartItems.filter(c => c.id !== existItem.id);
			setCartItems(newData);
		} else {
			const newData = cartItems.map(c =>
				c.id === existItem.id
					? { ...existItem, quantity: existItem.quantity - 1 }
					: c
			);
			setCartItems(newData);
		}
	};

	const onCheckout=()=>{
		telegram.MainButton.text='Sotib olish:)';
		telegram.MainButton.show()
	}

  return (
    <>
    <h1 className='heading'>Kurslar</h1>
    <Cart cartItems={cartItems} onCheckout={onCheckout}/>
      <div className="cards__container">
        {coursses.map(course =>(
          <Card 
          key={course.id}
          course={course}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </>
  )
}

export default App