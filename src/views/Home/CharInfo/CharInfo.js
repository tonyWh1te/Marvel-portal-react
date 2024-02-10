import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CharInfoLayout from '../../../components/CharInfoLayout/CharInfoLayout';
import MarvelService from '../../../services/MarvelService.service';
import setContent from '../../../utils/helpers/content.helper';

const CharInfo = ({ charId, children }) => {
  const [char, setChar] = useState(null);

  const marvelService = new MarvelService();
  const { clearError, process, setProcess } = marvelService.http;

  useEffect(() => updateChar(), [charId]);

  const updateChar = () => {
    if (!charId) {
      return;
    }

    clearError();

    marvelService.getCharacter(charId).then((char) => {
      setChar(char);
      setProcess('success');
    });
  };

  return children(setContent(process, CharInfoLayout, char));
};

CharInfo.propTypes = {
  charId: PropTypes.number,
  children: PropTypes.func.isRequired,
};

export default CharInfo;
