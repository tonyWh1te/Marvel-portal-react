import { Component } from 'react';
import CharListLoader from '../../../components/Loaders/CharListLoader/CharListLoader';
import MarvelService from '../../../services/MarvelService.service';
import './CharList.scss';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

export default class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    newItemsLoading: false,
    error: false,
    offset: 100,
    charEnded: false,
  };

  marvelService = new MarvelService();

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  componentDidMount() {
    this.onRequest();
    window.addEventListener('scroll', this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e) => {
    const { offset, newItemsLoading, charEnded } = this.state;
    const target = e.target;

    if (target.scrollHeight - target.clientHeight - target.scrollTop < 200 && !newItemsLoading && !charEnded) {
      this.onCharListLoading();
      this.onRequest(offset);
    }
  };

  onCharListLoading = () => {
    this.setState({ newItemsLoading: true });
  };

  onCharListLoaded = (newCharList) => {
    const ended = newCharList.length < 9 ? true : false;

    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      offset: offset + 9,
      newItemsLoading: false,
      charEnded: ended,
    }));
  };

  onRequest = (offset) => {
    this.marvelService.getAllCharacters(offset).then(this.onCharListLoaded).catch(this.onError);
  };

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
        {/* <Button href={null} children={'LOAD MORE'} classes={['button__main', 'button__long']} /> */}
      </div>
    );
  }
}
