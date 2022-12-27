import React from 'react';
import './App.css';
import NewGameModal from './components/newGame';
import UserInputModal from './components/userInput';
import UserInfoModal from './components/userInfo';
import CloseGame from './closeGame';
import OpenGame from './openGame';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // flow: "open-game",
      flow: "new-game",
      mode: null,
      // userInput: [ "red", "orange", "yellow", "lime" ]
      userInput: [],
    };
  }

  resetGame = () => {
    this.setState({
      flow: "new-game",
      userInput: []
    })
  }

  handleModeChange = (mode) => {
    const newFlow = mode === "open" ? "info" : "input";
    this.setState({ mode: mode, flow: newFlow});
  }

  handleInputChange = (input) => {
    this.setState({ 
      userInput: input,
      flow: "close-game"
    });
  }

  startGame = () => {
    this.setState({ flow: "open-game" })
  }

  renderFlow(flow) {
    switch (flow) {
      case "new-game":
        return <NewGameModal mode={this.state.mode} onModeChange={this.handleModeChange}></NewGameModal>;
      case "input":
        return <UserInputModal onInputChange={this.handleInputChange} onBackNavigate={this.resetGame}></UserInputModal>;
      case "info":
        return <UserInfoModal onStart={this.startGame} onBackNavigate={this.resetGame}></UserInfoModal>;
      case "open-game":
        return <OpenGame startNewGame={this.resetGame}></OpenGame>;
      case "close-game":
        return <CloseGame startNewGame={this.resetGame} userInput={this.state.userInput}></CloseGame>;
      default: return;
    }
  }


  render() {
    return (
      <div className="App">
        <div className="header-title">MaterMind</div>
        {this.renderFlow(this.state.flow)}
      </div>
    );
  }
}

export default App;
