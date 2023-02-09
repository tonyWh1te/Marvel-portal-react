import { Component } from 'react';
import CharListLoader from '../../../components/Loaders/CharListLoader/CharListLoader';
import MarvelService from '../../../services/MarvelService.service';
import Button from '../../../components/Button/Button';
import './CharList.scss';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

export default class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  componentDidMount() {
    this.marvelService
      .getAllCharacters()
      .then((charList) => this.setState({ charList, loading: false }))
      .catch(this.onError);
  }

  renderItems(arr) {
    const loading = this.state.loading;
    const items = (loading ? [...new Array(9)] : arr).map((item, i) => {
      if (loading) {
        return <CharListLoader key={i} />;
      } else {
        const { id, name, thumbnail } = item;
        const objectFit = thumbnail.includes('image_not_available') ? 'unset' : 'cover';

        return (
          <li className="char-content__list-item" key={id} onClick={() => this.props.onCharSelected(id)}>
            <img className="char-content__img" src={thumbnail} alt={name} style={{ objectFit: objectFit }} />
            <p className="char-content__name">{name}</p>
          </li>
        );
      }
    });

    return <ul className="char-content__list">{items}</ul>;
  }

  render() {
    const { charList, error } = this.state;
    const items = this.renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !error ? items : null;

    return (
      <div className="char-content__box">
        {errorMessage}
        {content}
        <Button href={null} children={'LOAD MORE'} classes={['button__main', 'button__long']} />
      </div>
    );
  }
}
