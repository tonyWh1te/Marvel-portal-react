import { Component } from 'react';
import MarvelService from '../../../services/MarvelService.service';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import Spinner from '../../../components/Spinner/Spinner';
import { Decor } from '../../../assets';
import Button from '../../../components/Button/Button';
import './RandomChar.scss';

export default class RandomChar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateChar();
  }

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  marvelService = new MarvelService();

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService
      .getCharacter(id)
      .then((char) => this.setState({ char, loading: false }))
      .catch(this.onError);
  };

  onChangeChar = () => {
    this.onCharLoading();
    this.updateChar();
  };

  onCharLoading = () => {
    this.setState({ loading: true, error: false });
  };

  render() {
    const { char, loading, error } = this.state;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
      <div className="random-char">
        <div className="container">
          <div className="random-char__inner">
            <div className="random-char__block">
              {errorMessage}
              {spinner}
              {content}
            </div>
            <div className="random-char__choice">
              <b className="random-char__title">
                Random character for today! <br />
                Do you want to get to know him better?
              </b>
              <b className="random-char__title">Or choose another one</b>
              <Button href={null} children={'try it'} classes={['button__main']} onClick={this.onChangeChar} />
              <img className="random-char__decor" src={Decor} alt="decor" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const View = ({ char }) => {
  let { name, description, thumbnail, homepage, wiki } = char;

  if (description) {
    description = description.length > 220 ? `${description.slice(0, 220)}...` : description;
  }

  const objectFit = thumbnail.includes('image_not_available') ? 'contain' : 'cover';

  return (
    <>
      <img className="random-char__img" src={thumbnail} alt={name} style={{ objectFit: objectFit }} />
      <div className="random-char__info">
        <b className="random-char__name">{name}</b>
        <p className="random-char__description">{description}</p>
        <div className="random-char__btns">
          <Button href={homepage} children={'homepage'} classes={['button__main']} />
          <Button href={wiki} children={'wiki'} classes={['button__secondary']} />
        </div>
      </div>
    </>
  );
};
