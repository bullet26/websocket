import { cardImageDefault } from 'assets'
import s from './card.module.scss'

export const CardFlip = () => {
  return (
    <div className={s.flipCard}>
      <div className={s.flipCardInner}>
        <div className={s.flipCardFront}>
          <img src={cardImageDefault} alt="card-front" />
        </div>
        <div className={s.flipCardBack}>
          <h2>Engineer</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat quisquam commodi,
            quidem tenetur consequuntur, recusandae at quis consequatur error nobis ullam voluptas
            doloremque officia, dolores nesciunt modi culpa accusamus. Ipsam.
          </p>
        </div>
      </div>
    </div>
  )
}
