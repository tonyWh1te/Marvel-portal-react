import { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../../components/Spinner/Spinner';
import Skeleton from '../../../components/Loaders/Skeleton/Skeleton';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import Button from '../../../components/Button/Button';
import MarvelService from '../../../services/MarvelService.service';
import './CharInfo.scss';

export default class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  onCharLoading = () => {
    this.setState({ loading: true, error: false });
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  updateChar = () => {
    const { charId } = this.props;

    if (!charId) {
      return;
    }

    this.onCharLoading();

    this.marvelService
      .getCharacter(charId)
      .then((char) => this.setState({ char, loading: false }))
      .catch(this.onError);
  };

  render() {
    const { char, loading, error } = this.state;

    const skeleton = !(error || loading || char) ? <Skeleton /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
      <div className="char-content__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ char: { name, description, thumbnail, homepage, wiki, comics } }) => {
  const objectFit = thumbnail.includes('image_not_available') ? 'contain' : 'cover';

  return (
    <>
      <div className="char-content__block">
        <img className="char-content__info-img" src={thumbnail} alt={name} style={{ objectFit: objectFit }} />
        <div>
          <b className="char-content__info-name">{name}</b>
          <div className="char-content__btns">
            <Button href={homepage} children={'homepage'} classes={['button__main']} />
            <Button href={wiki} children={'wiki'} classes={['button__secondary']} />
          </div>
        </div>
      </div>
      <p className="char-content__descr">{description}</p>
      <b className="char-content__comics">Comics:</b>
      <ul className="char-content__comics-list">
        {comics.length > 0 ? null : 'There is no comics with this character'}
        {comics.map((comic, i) => {
          return i < 10 ? (
            <li className="char-content__comics-item" key={i}>
              {comic.name}
            </li>
          ) : null;
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};
