import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Banner from '../component/Banner'
import Card from '../component/Card'
import Image from 'next/image' 
import { fetchCoffeeData } from '../lib/coffe-data'
import useTrackLocation from '../hooks/use-track-location'
import { useEffect, useState } from 'react'

export async function getStaticProps() {
 const data = await fetchCoffeeData();
  return {  
    props: {
       data,
    },
  }
}

export default function Home({ data }) {

const {handleTrackLocation, latLong, locationErrorMsg, findingLocation } = useTrackLocation(); 
const [coffeeShop, setCoffeeShop] = useState('')

console.log({ latLong, locationErrorMsg })

      //without cleaup!!
// useEffect(async() => {
//   if(latLong) {
//    try {
//     const fetch = await fetchCoffeeData(latLong);
//     console.log({fetch})
//    } catch(error) {
//     console.log(error)
//    } // } 
// },[latLong])

      // clean up
useEffect(() => { 
  const fetch = async () =>{
    if (latLong) {
      try {
        const fetchedCoffee = await fetchCoffeeData(latLong);
        console.log({fetchedCoffee})
        setCoffeeShop(fetchedCoffee)
      }catch (error) {
        console.log({error})
      }  
    }
  }
  fetch()
},[latLong]);
   


  const handleOnClick = () => {
    
    handleTrackLocation();
   } 


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
            <Banner button= {findingLocation ? "Locating..." : "View shop nearby"} 
            handleOnClick={handleOnClick}
            />
           {locationErrorMsg && <p style={{color:'white',fontWeight:'bolder'}}>Something went wrong:{locationErrorMsg}</p>}
        <div className={styles.heroImage}>
            <Image src="/static/hero-image.png" 
            width={700} height={400}
            />
        </div>

        {coffeeShop.length > 0 && (
        <div className={styles.sectionWrapper}>
       <h2 className={styles.heading2}>Stores near me</h2>
       <div className={styles.cardLayout}>
            {coffeeShop.map(data => {
              return(<Card 
                  key={data.fsq_id}
                  card={data.name}
                  imgUrl={data.imgUrl}
                  href={`/store/${data.fsq_id}`}
                  className={styles.card}
                /> 
              )
            })}
        </div>
        </div>
        )}

        {data.length > 0 && (
        <div className={styles.sectionWrapper}>
       <h2 className={styles.heading2}>Seoul Coffee Shops</h2>
       <div className={styles.cardLayout}>
            {data.map(data => {
              return(<Card 
                  key={data.fsq_id}
                  card={data.name}
                  imgUrl={data.imgUrl}
                  href={`/store/${data.fsq_id}`}
                  className={styles.card}
                /> 
              )
            })}
        </div>
        </div>
        )}
      </main>
    </div>
    
  )
}