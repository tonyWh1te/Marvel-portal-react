import { useHttp } from '../hooks/hooks';

export default class MarvelService {
  http = useHttp();

  #_apiBase = 'https://gateway.marvel.com:443/v1/public/';
  #_offestBase = 100;

  #transformChar = (char) => ({
    id: char.id,
    name: char.name,
    description: char.description ? char.description : 'Description not found',
    thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
    homepage: char.urls[0].url,
    wiki: char.urls[1].url,
    comics: char.comics.items,
  });

  #transformComic = (comic) => ({
    id: comic.id,
    title: comic.title,
    thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
    description: comic.description ? comic.description : 'Description not found',
    language: comic.textObjects[0]?.language || 'en-us',
    pages: comic.pageCount ? comic.pageCount : 'Number of pages unknown',
    price: comic.prices[0].price === 0 ? 'not avaible' : comic.prices[0].price,
  });

  getAllCharacters = async (offset = this.#_offestBase) => {
    const res = await this.http.request(`${this.#_apiBase}characters?limit=9&offset=${offset}&apikey=${process.env.REACT_APP_API_KEY}`);

    return res.data.results.map(this.#transformChar);
  };

  getCharacter = async (id) => {
    const res = await this.http.request(`${this.#_apiBase}characters/${id}?apikey=${process.env.REACT_APP_API_KEY}`);
    return this.#transformChar(res.data.results[0]);
  };

  getComics = async (offset = this.#_offestBase) => {
    const res = await this.http.request(`${this.#_apiBase}comics?orderBy=title&limit=8&offset=${offset}&apikey=${process.env.REACT_APP_API_KEY}`);

    return res.data.results.map(this.#transformComic);
  };

  getComic = async (id) => {
    const res = await this.http.request(`${this.#_apiBase}comics/${id}?apikey=${process.env.REACT_APP_API_KEY}`);

    return this.#transformComic(res.data.results[0]);
  };

  searchCharacter = async (name) => {
    const res = await this.http.request(`${this.#_apiBase}characters?name=${name}&apikey=${process.env.REACT_APP_API_KEY}`);

    return res.data.results.map(this.#transformChar);
  };
}
