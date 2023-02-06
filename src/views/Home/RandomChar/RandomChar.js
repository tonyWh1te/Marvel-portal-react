import MarvelService from '../../../services/MarvelService.service';
import { Component } from 'react';
import { Decor } from '../../../assets';
import Button from '../../../components/Button/Button';
import './RandomChar.scss';

export default class RandomChar extends Component {
  constructor(props) {
    super(props);
    this.updateChar();
  }

  state = {
    char: {},
  };

  marvelService = new MarvelService();

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService.getCharacter(id).then((char) => this.setState({ char }));
  };

  render() {
    let {
      char: { name, description, thumbnail, homepage, wiki },
    } = this.state;

    if (description) {
      description = description.length > 220 ? `${description.slice(0, 220)}...` : description;
    }

    return (
      <div className="random-char">
        <div className="container">
          <div className="random-char__inner">
            <div className="random-char__block">
              <img className="random-char__img" src={thumbnail} alt={name} />
              <div className="random-char__info">
                <b className="random-char__name">{name}</b>
                <p className="random-char__description">{description}</p>
                <div className="random-char__btns">
                  <Button href={homepage} children={'homepage'} classes={['button__main']} />
                  <Button href={wiki} children={'wiki'} classes={['button__secondary']} />
                </div>
              </div>
            </div>
            <div className="random-char__choice">
              <b className="random-char__title">
                Random character for today! <br />
                Do you want to get to know him better?
              </b>
              <b className="random-char__title">Or choose another one</b>
              <Button href={null} children={'try it'} classes={['button__main']} />
              <img className="random-char__decor" src={Decor} alt="decor" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
