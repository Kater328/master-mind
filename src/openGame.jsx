import React from 'react';
import { createNewSet, decode, filterSet, buildHypothesis } from './utils';
import { firstCheck } from './const';
import VictoryInfoModal from './components/victoryInfo';

class OpenGame extends React.Component {
  constructor(props) {
    super(props);
    this.fullSet = createNewSet();

    this.state = {
      history: [],
      set: [...this.fullSet],
      result: null,
      bullsValue: 0,
      cowsValue: 0
    };
  }

  componentDidMount() {
    this.makeStep(firstCheck);
  }

  makeStep(str) {
    const historyArr = decode(str);
    const row = { str, arr: historyArr, setCount: this.state.set.length };
    this.setState((prevState) => ({
      history: [...prevState.history, row]
    }));
  }

  processNextStep() {
    const hypothesis = buildHypothesis(this.state.set);
    let hypMaxValue = 0, str = "";
    this.state.set.reverse().forEach(
      (hyp) => (str = hypothesis[hyp] > hypMaxValue ? hyp : str)
    );
    // if (!str.length)
    this.makeStep(str);
  }

  showVictory(str) {
    const steps = this.state.history.length;
    this.setState({ result: {steps, colors: decode(str)} });
  }

  handleUserInput() {
    const extendHistory = this.state.history.map(el => {
      if (!el.bulls) el.bulls = this.state.bullsValue;
      if (!el.cows) el.cows = this.state.cowsValue;
      return el;
    })
    this.setState({ 
      history: extendHistory,
      bullsValue: 0,
      cowsValue: 0
    });
    const newSet = filterSet(this.state.set, this.state.history.at(-1));
    if (newSet.length === 1) return this.showVictory(newSet[0]);
    this.setState({ set: newSet }, () => this.processNextStep());
  }

  setValue = (evt, name) => {
    this.setState({ [name]: Number(evt.target.value) ?? 0 });
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
            {arr?.length
              ? arr.map((el, index) => this.renderCircle(el, i, index))
              : 'Most likely you incorrectly defined "cows" and "bulls".'
            }
          </div>
        </td>
        <td>
          {arr?.length
            ? bulls ?? <input type="number" min="0" max="4" value={this.state.bullsValue} onChange={(evt) => this.setValue(evt, "bullsValue")}/>
            : "-"
          }
        </td>
        <td>
          {arr?.length
            ? cows ?? <input type="number" min="0" max="4" value={this.state.cowsValue} onChange={(evt) => this.setValue(evt, "cowsValue")}/>
            : "-"
          }
        </td>
        <td>
          {(arr?.length && i === this.state.history.length - 1 && !this.state.result)
            ? <button onClick={this.handleUserInput.bind(this)}>Next Step</button>
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

export default OpenGame;
