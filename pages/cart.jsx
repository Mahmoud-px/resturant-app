import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "redux/cartSlice";
// import { PayPalScriptProvider, PayPalButtons, } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetail from "Components/OrderDetail";
import axios from "axios";


const Cart = () => {

  const cart = useSelector((state) => state.cart)
  const sum = cart.products.reduce((acc, product) => {
    return acc + product.totalCost;
  }, 0);
  const dispatch = useDispatch();
  const router = useRouter();
  const amount = cart.total;
  const [cash, setCash] = useState(false);


  const createOrder = async (data) => {
    console.log("Creating order with data:", data);
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      console.log("Order created:", res.data);
      if (res.status === 201) {
        router.push(`/orders/${res.data._id}`);
        dispatch(reset());
      }
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th className={styles.th}>Product</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Extras</th>
              <th className={`${styles.th} ${styles.thPrice}`}>Price</th>
              <th className={styles.th}>Quantity</th>
              <th className={styles.th}>Total</th>
            </tr>
            {cart.products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td className={`${styles.imgContainer}`}>
                  <Image
                    src={product.img}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                    className={`${styles.imgContainer}`}
                    />
                </td>
                <td className={styles.td}>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.extras}>
                    {product.garlicExtra} <br/> {product.ketchupExtra}
                  </span>
                </td>
                <td className={styles.td}>
                  <span className={styles.price}>${product.gradientSum}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.total}>${product.totalCost}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${sum}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${sum}
          </div>
          {/* <PayPalScriptProvider options={{ "client-id": "test", "disable-funding": "credit,card,p24", }}>
            <PayPalButtons
                className={styles.paypal}
                createOrder={(data, actions) => {
                  return actions.order.create({
                      purchase_units: [
                          {
                              amount: {
                                  value: amount,
                              },
                          },
                      ],
                  });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                        const shipping = details.purchase_units[0].shipping;
                        createOrder({
                          customer: shipping.name.full_name,
                          address: shipping.address.address_line_1,
                          total: cart.total,
                          method: 1,
                        });
                    });
                }}
            />
          </PayPalScriptProvider> */}
          <button className={styles.button} onClick={() => setCash(true)}>
            Cash on delivery
          </button>
        </div>
      </div>
      {cash && <OrderDetail total={sum} createOrder={createOrder} />}
    </div>
  );
};

export default Cart;
