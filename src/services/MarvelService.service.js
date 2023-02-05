export default class MarvelService {
  #_apiBase = 'https://gateway.marvel.com:443/v1/public/';

  #getResourse = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
  };

  getAllCharacters() {
    return this.#getResourse(`${this.#_apiBase}characters?limit=9&offset=210&apikey=${process.env.REACT_APP_API_KEY}`);
  }

  getCharacter(id) {
    return this.#getResourse(`${this.#_apiBase}characters/${id}?apikey=${process.env.REACT_APP_API_KEY}`);
  }
}
