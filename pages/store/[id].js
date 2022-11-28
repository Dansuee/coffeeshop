import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from '../../styles/store.module.css';
import cls from 'classnames'

import { fetchCoffeeData } from "../../lib/coffe-data";

export  async function getStaticProps( context ) {
    const params = context.params;
   
    const coffeeData = await fetchCoffeeData();
    return { 
        props: {
            data: coffeeData.find(data => {
                return data.fsq_id.toString() === params.id
            }),
        }, 
    };
};

export async function getStaticPaths() {
    const coffeeData = await fetchCoffeeData();
    console.log(coffeeData)
    
    const paths = coffeeData.map(data =>{
        return {
            params: { id:data.fsq_id.toString(), }
          }
        });
        return {
          paths,
          fallback: true,
        };
      }

const Store = ({ data }) => {
    const router = useRouter();
    if(router.isFallback) {
        return <div>Loading...</div>
    }
    const {fsq_id,name, location, imgUrl } = data 

    console.log(data)
    
    const hanldeUpvoteButton = () => {
        console.log("")
    }
 
    return ( 
   <div className={styles.layout} key={fsq_id}>
      <Head>
        <title>{name}</title>
         </Head>
        <div className={styles.container}>
        <div className={styles.col1}>
        <div className={styles.backToHomeLink}>
          <Link href='/'>← Back to Home</Link>
        </div>
        <div className={styles.nameWrapper}>
         <h1 className={styles.name}>{name}</h1>
        </div>
            <Image 
            src={imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} 
            width={600} 
            height={360} 
            className={styles.storeImg}
            alt={name}
                 />
        </div>
         <div className={cls("glass",styles.col2)}>
            <div className={styles.iconWrapper}>
                <Image src="/icons/places.svg" width={24} height={24} />
                <p className={styles.text}>{location.formatted_address}</p>
                </div>
                { location.cross_street && <div className={styles.iconWrapper}>
                  <Image src="/icons/nearMe.svg" width={24} height={24} />
                    <p className={styles.text}>{ location.cross_street }</p>
                </div> }
                <div className={styles.iconWrapper}>
                    <Image src="/icons/star.svg" width={24} height={24} />
                    <p className={styles.text}>1</p>
                </div>
                <button className={styles.upvoteButton} onClick={hanldeUpvoteButton}>Vote!</button>
            </div>
        </div>
      </div>  
     );
}
 
export default Store;
