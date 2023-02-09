import { Component } from 'react';
import { Vision } from '../../../assets';
import CharInfo from '../CharInfo/CharInfo';
import CharList from '../CharList/CharList';
import ErrorBoundary from '../../../components/ErrorBoundary/ErrorBoundary';
import RandomChar from '../RandomChar/RandomChar';
import './HomePage.scss';

export default class HomePage extends Component {
  state = {
    selectedChar: null,
  };

  onCharSelected = (id) => {
    this.setState({ selectedChar: id });
  };

  render() {
    return (
      <>
        <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>
        <div className="char-content">
          <div className="container">
            <div className="char-content__inner">
              <ErrorBoundary>
                <CharList onCharSelected={this.onCharSelected} />
              </ErrorBoundary>
              <ErrorBoundary>
                <CharInfo charId={this.state.selectedChar} />
              </ErrorBoundary>
            </div>
          </div>
        </div>
        <img className="bg-decor" src={Vision} alt="vision" />
      </>
    );
  }
}
