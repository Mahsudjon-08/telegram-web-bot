import './cart.css'
import Button from '../button/button'
import { totalPrice } from '../../units/total_price'

function cart({cartItems,onCheckout}) {
  return (
    <div className='cart_container'>
        <p>
          Umumiy narx:
          {totalPrice(cartItems).toLocaleString("en-US",{
                    style:'currency',
                    currency:'USD',
                })}
        </p>
        <Button title={`${cartItems.length===0 ?'Buyurma berish':'Tolov'}`}
        disable={cartItems.length===0 ? true: false}
        type={'checkout'}/>
        onClick={onCheckout}
    </div>
  )
}

export default cart