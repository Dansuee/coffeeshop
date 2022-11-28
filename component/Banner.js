import styles from './banner.module.css';

const Banner = ({button, handleOnClick}) => {
    

    return ( 
        <div className={styles.container}>
            <h1 className={styles.title}>
            <span className={styles.title1}>Coffee</span>
            <span className={styles.title2}>Shop</span>
            </h1>
            <p className={styles.subTitle}>Discover your local coffe shops!</p>
            <div className={styles.buttonWrapper}></div>
            <button className={styles.button} onClick={handleOnClick}>{button}</button>
        </div>
     );
}
 
export default Banner;