import axios from 'axios'
import Add from 'Components/Add'
import AddButton from 'Components/AddButton'
import Featured from 'Components/Featured'
import PizzaList from 'Components/PizzaList'
import Head from 'next/head'
import { useEffect, useState } from 'react'


export default function Home({pizzaList, admin}) {

  const [close, setClose] = useState(true);

  if (pizzaList.length === 0){
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  return (
    <>
      <Head>
        <title>Pizza Resturant app</title>
        <meta name="description" content="Best pizza resturant in Egypt" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Featured/>
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList}/>
      {!close && <Add setClose={setClose} />}
    </>
  )
}


export const getServerSideProps = async (ctx) => {

  const myCookie = ctx.req?.cookies || ""
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  try{
    const res = await axios.get("http://localhost:3000/api/products");

    return {
      props: {
        pizzaList : res.data,
        admin,
      }
    }
  }
  catch(err){
    console.log(err)
  }
  return{
    props: {
      pizzaList : [],
      admin,
    }
  }
}