import '../stylingFolder/BillingPage.css'
import HeaderComponent from '../components/HeaderComponent'
import { useState, useEffect } from 'react';
function BillingPage () {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const [purchaseTotal, setPurchaseTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(100);
    const transactionFee = 100;

    useEffect(() => {
      if (cartItems && cartItems.length > 0) {
        console.log(cartItems)
        let sum = 0;
        cartItems.forEach((cartItem) => {
          sum += cartItem.price * cartItem.quantity
          setPurchaseTotal(sum)
        })
        setSubtotal(sum + transactionFee)
      }
    }, [cartItems])


    return (
        <div>
          <HeaderComponent />
          <h2 className="billing-head">Billing Details</h2>
          <form className="billing-form">
            <div className="flex-container">
              <div className="input-container firstName-container">
                <label htmlFor="firstName" className="label">First Name</label>
                <input type="text" id="firstName" name="firstName" required className="input" />
              </div>
              <div className="input-container lastName-container">
                <label htmlFor="lastName" className="label">Last Name</label>
                <input type="text" id="lastName" name="lastName" required className="input" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="label">Email</label>
              <input type="email" id="email" name="email" required className="input" />
            </div>
            <div>
              <label htmlFor="phone" className="label">Phone</label>
              <input type="tel" id="phone" name="phone" required className="input" />
            </div>
            <div>
              <label htmlFor="country" className="label">Country</label>
              <input type="text" id="country" name="country" required className="input" />
            </div>
            <div>
              <label htmlFor="state" className="label">State</label>
              <input type="text" id="state" name="state" required className="input" />
            </div>
            <div>
              <label htmlFor="lga" className="label">LGA</label>
              <input type="text" id="lga" name="lga" required className="input" />
            </div>
            <div>
              <label htmlFor="streetAddress" className="label">Street Address</label>
              <input type="text" id="streetAddress" name="streetAddress" required className="input" />
            </div>

            <h3 className="order-detail-text">Order Details</h3>

            <div className="order-flex">
              <div>Product</div>
              <div>Sub total</div>
            </div>
            <div className="">
              {/* <div className="order-flex">
                <img src="" />
                <p>name of product</p>
              </div>
              <div style={{fontWeight: 'bold'}}>N 300000</div> */}
              {cartItems.map((item, index) => (
                <div className="order-flex" key={index}>
                    <div className="mini-order-flex">
                      <div>
                        <img src={item.image} />
                      </div>
                      <div>
                         <p>{item.name}</p>
                      </div>
                    </div>
                    <div style={{ fontWeight: 'bold' }}>N {item.price}</div>
                </div>
                ))}
            </div>
            <div className="order-flex">
              <div>Purchase total</div>
              <div style={{fontWeight: 'bold'}}>N {purchaseTotal}</div>
            </div>
            <div className="order-flex">
              <div>Transaction fee</div>
              <div style={{fontWeight: 'bold'}}>N {transactionFee}</div>
            </div>
            <div className="order-flex">
              <div>Sum total</div>
              <div style={{fontWeight: 'bold'}}>N {subtotal}</div>
            </div>
            <button type="submit" className="place-order-btn">Place order</button>
          </form>
        </div>
      );
}

export default BillingPage;