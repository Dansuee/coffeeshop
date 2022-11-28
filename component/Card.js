import Link from "next/link";
import Image from "next/image";
import cls from "classnames";
import styles from './card.module.css'


const Card = ({ card, href, imgUrl }) => {
    return ( 
        <Link href={href} className={styles.cardLink}>
            <div className={cls("glass", styles.container)}>
                <div className={styles.cardHeaderWrapper}>
                    <h2 className={styles.cardHeader}>{card}</h2>
                </div>   
                <div className={styles.cardImageWrapper}>
                    <Image 
                        className={styles.cardImage}
                        src={imgUrl} 
                        width={260} 
                        height={160} 
                    />
                </div>
            </div>  
        </Link>
     );
}
 
export default Card;