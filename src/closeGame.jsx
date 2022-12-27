import React from 'react';
import { createNewSet, encode, decode, checkStrings, filterSet, buildHypothesis } from './utils';
import { firstCheck } from './const';
import VictoryInfoModal from './components/victoryInfo';

class CloseGame extends React.Component {
  constructor(props) {
    super(props);
    this.fullSet = createNewSet();

    this.state = {
      history: [],
      set: [...this.fullSet],
      userInput: encode(this.props.userInput),
      result: null,
    };
  }

  componentDidMount() {
    this.makeStep(firstCheck);
  }

  makeStep(str, input = this.state.userInput) {
    let [bulls, cows] = checkStrings(input, str);
    const historyArr = decode(str);
    const row = { str, arr: historyArr, bulls, cows, setCount: this.state.set.length };
    this.setState((prevState) => ({
      history: [...prevState.history, row]
    }), () => {
      if (bulls === 4) {
        return this.showVictory(str);
      } else {
        const newSet = filterSet(this.state.set, this.state.history.at(-1));
        if (newSet.length === 1) return this.showVictory(newSet[0]);
        this.setState({ set: newSet });
      }
    });
  }

  processNextStep() {
    const hypothesis = buildHypothesis(this.state.set);
    let hypMaxValue = 0, str = "";
    this.state.set.reverse().forEach(
      (hyp) => (str = hypothesis[hyp] > hypMaxValue ? hyp : str)
    );
    this.makeStep(str);
  }

  showVictory(str) {
    const steps = this.state.history.length;
    this.setState({ result: {steps, colors: decode(str)} });
  }

  renderCircle(color, step, index) {
    return <div key={step + index + color} className="circle" style={{backgroundColor: color}}></div>;
  }

  renderRow({ arr, bulls, cows, setCount }, i) {
    if (i === 0) return null;
    return (
      <tr key={i}>
        <td>{i}.</td>
        <td>{setCount}</td>
        <td>
          <div className="columns">
            {arr.map((el, index) => this.renderCircle(el, i, index))}
          </div>
        </td>
        <td>{bulls}</td>
        <td>{cows}</td>
        <td>
          {(i === this.state.history.length - 1 && !this.state.result)
            ? <button onClick={this.processNextStep.bind(this)}>Next Step</button>
            : "-"
          }
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div className="table">
        <div className="columns">
          <button className="backBtn newBtn" onClick={this.props.startNewGame}>Start New Game</button>
          User Input:
          {this.props.userInput.map((el, index) => this.renderCircle(el, 0, index))}
        </div>
        <table>
          <thead>
            <tr>
              <th>Step</th>
              <th>Remaining options</th>
              <th className="check">Check</th>
              <th>Bulls</th>
              <th>Cows</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.history.map((el, index) => this.renderRow(el, index))}
          </tbody>
        </table>
        <VictoryInfoModal result={this.state.result} startNewGame={this.props.startNewGame}></VictoryInfoModal>
      </div>
    );
  }
}

export default CloseGame;
