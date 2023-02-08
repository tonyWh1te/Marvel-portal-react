export default class MarvelService {
  #_apiBase = 'https://gateway.marvel.com:443/v1/public/';

  #getResourse = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
  };

  #transformChar = (char) => ({
    id: char.id,
    name: char.name,
    description: char.description ? char.description : 'Description not found',
    thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
    homepage: char.urls[0].url,
    wiki: char.urls[1].url,
  });

  getAllCharacters = async () => {
    const res = await this.#getResourse(`${this.#_apiBase}characters?limit=9&offset=210&apikey=${process.env.REACT_APP_API_KEY}`);

    return res.data.results.map(this.#transformChar);
  };

  getCharacter = async (id) => {
    const res = await this.#getResourse(`${this.#_apiBase}characters/${id}?apikey=${process.env.REACT_APP_API_KEY}`);

    return this.#transformChar(res.data.results[0]);
  };
}
