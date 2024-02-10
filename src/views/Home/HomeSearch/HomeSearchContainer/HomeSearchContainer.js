import { useState, useEffect } from 'react';
import Button from '../../../../components/Button/Button';
import MarvelService from '../../../../services/MarvelService.service';
import SpinnerBtn from '../../../../components/Spinners/SpinnerBtn/SpinnerBtn';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import HomeSearchResult from '../HomeSearchResult/HomeSearchResult';
import HomeSearchError from '../HomeSearchError/HomeSearchError';
import './HomeSearchContainer.scss';

const setContent = (process, data, errorMsg) => {
  switch (process) {
    case 'success':
      return <HomeSearchResult data={data} />;
    case 'search-error':
      return <HomeSearchError msg={errorMsg} />;
    case 'error':
      return <ErrorMessage />;
    default:
      return null;
  }
};

const HomeSearchContainer = () => {
  const [search, setSearch] = useState('');
  const [char, setChar] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const marvelService = new MarvelService();
  const { clearError, process, setProcess } = marvelService.http;

  useEffect(() => {
    setErrorMsg('');
  }, [search]);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    clearError();

    if (search.length === 0) {
      setProcess('search-error');
      setErrorMsg('The field cannot be empty!');
      return;
    }

    marvelService
      .searchCharacter(search)
      .then((res) => {
        setChar(res);
        setProcess('success');
      })
      .finally(() => setSearch(''));
  };

  const loading = process === 'fetching';
  const btnContent = loading ? <SpinnerBtn /> : 'find';

  return (
    <View
      onSubmit={onSubmit}
      onChange={onChange}
      loading={loading}
      btnContent={btnContent}
      char={char}
      process={process}
      errorMsg={errorMsg}
      search={search}
    />
  );
};

const View = (props) => {
  const { onSubmit, onChange, loading, btnContent, char, process, errorMsg, search } = props;

  return (
    <div className="char-search">
      <form
        className="char-search__form"
        onSubmit={onSubmit}
      >
        <label
          className="char-search__label"
          htmlFor="search"
        >
          Or find a character by name:
        </label>
        <div className="char-search__box">
          <input
            className="char-search__input"
            type="search"
            name="search"
            id="search"
            placeholder="Enter name"
            value={search}
            onChange={onChange}
          />
          <Button
            classes={['button__main']}
            btnProps={{ type: 'submit', disabled: loading }}
          >
            {btnContent}
          </Button>
        </div>
      </form>
      {setContent(process, char, errorMsg)}
    </div>
  );
};

export default HomeSearchContainer;
