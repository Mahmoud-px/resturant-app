import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import Link from "next/link";

const Product = ({pizza}) => {

  let small = pizza.prices[0]
  let medium = pizza.prices[1]
  let large = pizza.prices[2]
  let garlicSauseCost = pizza.extraOptions[0].price
  let ketchupCost = pizza.extraOptions[1].price
  

  const [sizeCost, setSizeCost] = useState(small);
  const [garlickCheck, setGarlicCheck] = useState(0)
  const [ketchupCheck, setKetchupCheck] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [totalCost, setTotalCost] = useState(sizeCost);
  const dispatch = useDispatch()
  const [ketchupExtra, setKetchupExtra] = useState("")
  const [garlicExtra, setGarlicExtra] = useState("")
  

  function garlicChange(e){
    if (e.target.checked){
      setGarlicCheck(garlicSauseCost)
      setGarlicExtra("Garlic Sauce")
    }else{
      setGarlicCheck(0)
      setGarlicExtra("")
      }
    }

  function ketchupChange(e){
    if (e.target.checked){
      setKetchupCheck(ketchupCost)
      setKetchupExtra("ketchup")
    }else{
      setKetchupCheck(0)
      setKetchupExtra("")
      }
    }
  

  const gradientSum = sizeCost + garlickCheck + ketchupCheck
  
  useEffect(() => {
    setTotalCost(gradientSum * quantity);
  }, [sizeCost, garlickCheck, ketchupCheck, quantity]);

  const handleClick = () => {
    dispatch(addProduct({...pizza,totalCost,quantity,gradientSum, ketchupExtra, garlicExtra}))
  }


  return (

    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <h3 className={styles.price}>`{totalCost} $`</h3>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => setSizeCost(small)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => setSizeCost(medium)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => setSizeCost(large)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
            <div className={styles.option}>
              <input
                type="checkbox"
                id= "garlic Sause"
                name="garlicSause"
                className={styles.checkbox}
                onChange={garlicChange}
              />
              <label className={styles.ingredient} htmlFor="double">garlicSause</label>
            </div>
            <div className={styles.option}>
              <input
                type="checkbox"
                id= "ketchup"
                name="ketchup"
                className={styles.checkbox}
                onChange={ketchupChange}
              />
              <label className={styles.ingredient} htmlFor="double">ketchup</label>
            </div>
        </div>
        <div className={styles.add}>
            <input type="number" defaultValue={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} className={styles.quantity}/>
            <button className={styles.button} onClick={handleClick}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({params}) => {

  const res = await axios.get(`https://pizza-clone-git-main-mahmoud-px.vercel.app//api/products/${params.id}`);
  return{
    props:{
      pizza: res.data,
    }
  }
}

export default Product;
