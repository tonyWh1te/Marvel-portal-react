import { Thor } from '../../../assets';
import Button from '../../../components/Button/Button';
import './CharInfo.scss';

export default function CharInfo() {
  return (
    <div className="char-content__info">
      <div className="char-content__block">
        <img className="char-content__info-img" src={Thor} alt="thor" />
        <div>
          <b className="char-content__info-name">THOR</b>
          <div className="char-content__btns">
            <Button isLink={true} children={'homepage'} classes={['button__main']} />
            <Button isLink={true} children={'wiki'} classes={['button__secondary']} />
          </div>
        </div>
      </div>
      <p className="char-content__descr">
        In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By
        the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari
        and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In
        addition, Loki is referred to as the father of Váli in the Prose Edda.
      </p>
      <b className="char-content__comics">Comics:</b>
      <ul className="char-content__comics-list">
        <li className="char-content__comics-item">All-Winners Squad: Band of Heroes (2011) #3</li>
        <li className="char-content__comics-item">Alpha Flight (1983) #50</li>
        <li className="char-content__comics-item">Amazing Spider-Man (1999) #503</li>
        <li className="char-content__comics-item">Amazing Spider-Man (1999) #504</li>
        <li className="char-content__comics-item">AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)</li>
        <li className="char-content__comics-item">Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)</li>
        <li className="char-content__comics-item">Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)</li>
      </ul>
    </div>
  );
}
