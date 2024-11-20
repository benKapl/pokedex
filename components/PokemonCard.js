import styles from '../styles/PokemonCard.module.css';

const PokemonCard = ({ type, name, img }) => {

    return (
        <div className={`${styles.pokemon} ${styles[type]}`}>
            <div className={styles.imgContainer}>
                <img src={img} alt={name} />
            </div>
            <div className={styles.info}>
                <h3 className={styles.name}>{name}</h3>
                <span>Type: <span>{type}</span></span>
            </div>
        </div>
    )
}

export default PokemonCard