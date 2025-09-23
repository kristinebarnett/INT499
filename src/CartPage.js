// CartPage.js 
import React from 'react'; 
import { useCart } from './CartProvider'; 
  
const CartPage = () => { 
  const { items, total, updateQty, removeItem, clear } = useCart(); 
  
  return ( 
    <div> 
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>🛒 Your Cart</h2> 
      {items.length === 0 ? ( 
        <p>No items in cart.</p> 
      ) : ( 
        <div> 
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}> 
            <thead> 
              <tr style={{ borderBottom: '1px solid #444' }}> 
                <th style={{ textAlign: 'left', padding: '10px' }}>Item</th> 
                <th style={{ textAlign: 'center' }}>Qty</th> 
                <th style={{ textAlign: 'center' }}>Price</th> 
                <th style={{ textAlign: 'center' }}>Total</th> 
                <th style={{ textAlign: 'center' }}>Actions</th> 
              </tr> 
            </thead> 
            <tbody> 
              {items.map(item => ( 
                <tr key={item.id} style={{ borderBottom: '1px solid #333' }}> 
                  <td style={{ padding: '10px' }}>{item.name}</td> 
                  <td style={{ textAlign: 'center' }}> 
                    <input 
                      type="number" 
                      value={item.qty} 
                      min="1" 
                      onChange={(e) => updateQty(item.id, parseInt(e.target.value))} 
                      style={{ width: '50px', textAlign: 'center' }} 
                    /> 
                  </td> 
                  <td style={{ textAlign: 'center' }}>${item.price.toFixed(2)}</td> 
                  <td style={{ textAlign: 'center' }}>${(item.price * item.qty).toFixed(2)}</td> 
                  <td style={{ textAlign: 'center' }}> 
                    <button 
                      onClick={() => removeItem(item.id)} 
                      style={{ 
                        backgroundColor: '#ff4d4d', 
                        color: '#fff', 
                        border: 'none', 
                        padding: '6px 12px', 
                        borderRadius: '4px', 
                        cursor: 'pointer' 
                      }} 
                    > 
                      Remove 
                    </button> 
                  </td> 
                </tr> 
              ))} 
            </tbody> 
          </table> 
          <h3>Total: ${total.toFixed(2)}</h3> 
          <button 
            onClick={clear} 
            style={{ 
              backgroundColor: '#555', 
              color: '#fff', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '4px', 
              cursor: 'pointer', 
              marginTop: '10px' 
            }} 
          > 
            Clear Cart 
          </button> 
        </div> 
      )} 
    </div> 
  ); 
}; 
  
export default CartPage; 