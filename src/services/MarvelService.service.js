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

  getAllCharacters = async (offset = this.#_offestBase) => {
    const res = await this.http.request(`${this.#_apiBase}characters?limit=9&offset=${offset}&apikey=${process.env.REACT_APP_API_KEY}`);

    return res.data.results.map(this.#transformChar);
  };

  getCharacter = async (id) => {
    const res = await this.http.request(`${this.#_apiBase}characters/${id}?apikey=${process.env.REACT_APP_API_KEY}`);
    return this.#transformChar(res.data.results[0]);
  };
}
