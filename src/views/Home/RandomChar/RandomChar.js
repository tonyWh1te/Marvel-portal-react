import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import MarvelService from '../../../services/MarvelService.service';
import { Decor } from '../../../assets';
import Button from '../../../components/Button/Button';
import setContent from '../../../utils/helpers/content.helper';
import { divVariants } from '../../../utils/constants';
import './RandomChar.scss';

const RandomChar = () => {
  const [char, setChar] = useState({});

  const marvelService = new MarvelService();
  const { clearError, process, setProcess } = marvelService.http;

  useEffect(() => {
    updateChar();

    const interval = setInterval(updateChar, 60000);

    return () => clearInterval(interval);
  }, []);

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    marvelService.getCharacter(id).then((char) => {
      setChar(char);
      setProcess('success');
    });
  };

  const onChangeChar = () => {
    clearError();
    updateChar();
  };

  return (
    <div className="random-char">
      <div className="container">
        <div className="random-char__inner">
          {setContent(process, View, char)}
          <div className="random-char__choice">
            <b className="random-char__title">
              Random character for today! <br />
              Do you want to get to know him better?
            </b>
            <b className="random-char__title">Or choose another one</b>
            <Button
              classes={['button__main']}
              onClick={onChangeChar}
            >
              try it
            </Button>
            <img
              className="random-char__decor"
              src={Decor}
              alt="decor"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const View = ({ data }) => {
  let { name, description, thumbnail, homepage, wiki } = data;

  if (description) {
    description = description.length > 220 ? `${description.slice(0, 220)}...` : description;
  }

  const objectFit = thumbnail.includes('image_not_available') ? 'contain' : 'cover';

  return (
    <m.div
      className="random-char__block"
      variants={divVariants}
      initial="hidden"
      animate="visible"
    >
      <img
        className="random-char__img"
        src={thumbnail}
        alt={name}
        style={{ objectFit: objectFit }}
      />
      <div className="random-char__info">
        <b className="random-char__name">{name}</b>
        <p className="random-char__description">{description}</p>
        <div className="random-char__btns">
          <Button
            href={homepage}
            classes={['button__main']}
          >
            homepage
          </Button>
          <Button
            href={wiki}
            classes={['button__secondary']}
          >
            wiki
          </Button>
        </div>
      </div>
    </m.div>
  );
};

export default RandomChar;
