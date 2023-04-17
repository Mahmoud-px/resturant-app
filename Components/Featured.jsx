import React, { useState } from 'react'
import Image from "next/image";
import style from '../styles/Featured.module.css'


const Featured = () => {

    let [count, setCount] = useState(0);

    function handleClick(direction){
        if (direction === 'right'){
            setCount(count !== 2 ? count+1 : 0)
        }
        else if (direction === 'left'){
            setCount(count !== 0 ? count-1 : 2)
        }
    }

    const [animate, setAnimate] = useState(true)
    function stopAnimation(){
        setAnimate(false);
    }

  return (
    <>

        <section className={`${style.carousel}`}>

            <boxContainer className={`${style.boxContainer} ${animate ? style.boxAnimation : ''}`} style={{transform: `translateX(${-100*count}vw)`}}>
                <box className={`${style.box}`}>
                    <h2 className={`${style.carouselText}`}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa a iure aliquid molestiae consequuntur eveniet.</h2>
                    <Image className={`${style.carouselImg}`} src='/img/featured10.png' alt='' width={450} height={450}/>
                </box>
                <box className={`${style.box}`}>
                    <Image className={`${style.carouselImg}`} src='/img/feature15.jpg' alt='' width={450} height={450}/>
                    <h2 className={`${style.carouselText}`}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa a iure aliquid molestiae consequuntur eveniet.</h2>
                </box>
                <box className={`${style.box}`}>
                    <h2 className={`${style.carouselText}`}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa a iure aliquid molestiae consequuntur eveniet.</h2>
                    <Image className={`${style.carouselImg}`} src='/img/featured7.png' alt='' width={450} height={450}/>
                </box>
            </boxContainer>

            <buttonContainer className={`${style.buttonContainer}`}>
                <i className={`bi bi-caret-right ${style.arrow}`} style={{right:0}} onClick={() => {handleClick("right"); stopAnimation()}}></i>
                <i className={`bi bi-caret-left ${style.arrow}`} style={{left:0}} onClick={() => {handleClick("left"); stopAnimation()}}></i>
            </buttonContainer>

        </section>
    </>
  )
}

export default Featured