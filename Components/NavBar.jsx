import React from 'react'
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import Link from 'next/link';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const quantity = useSelector((state) => state.cart.quantity)
  return (
    <div className={styles.container}>
        <Link href="/"><Image src="/img/logo2.png" alt="" width="180" height="80" className={styles.logo}/></Link>
        <div className={styles.order}>
          <div className={styles.callButton}>
            <Image src="/img/telephone.png" alt="" width="27" height="27" className={styles.telephone}/>
          </div>
          <div className={styles.orderText}>
            <div className={styles.text}>ORDER NOW!</div>
            <div className={styles.text}>012 345 678</div>
          </div>
        </div>
        <ul className={styles.list}>
          <li className={styles.listItem}>Homepage</li>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
        <Link href='/cart' passHref>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30" height="30" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </Link>
    </div>
  )
}

export default NavBar
