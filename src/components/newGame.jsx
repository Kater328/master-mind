import React from 'react';

class NewGameModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: props.mode
    };
  }

  handleRadioChange = (evt) => {
    this.setState({ mode: evt.target.value });
  }

  submitForm = () => {
    this.props.onModeChange(this.state.mode);
  }

  render() {
    return (
      <div className="modal">
        <form onSubmit={this.submitForm}>
          <div className="title">New Game</div>
          <div className="content">
            The essence of the game is quite simple. The cryptographer (you) chooses a pattern of four chips from a set of six available colors. the "cracker" (me) is trying to guess this combination. To do this, I offer various combinations.
            <br /><br />In response to the cracker's move, the cryptographer must show how many digits:
            <br /><br />A) guessed and on its place and mark it with a black marker (bull).
            <br /><br />B) guessed and out of place and mark it with a white marker (cow).
            <br /><br />If you want to mark the answers yourself, choose the open game mode. If not, choose a closed mode (I promise to be honest in my search).
            <br /><br />I am also sure that I can guess in no more than 6 attempts.

            <br /><br />Select the mode:
              <div>
                <input type="radio" id="open" name="mode" value="open" onChange={this.handleRadioChange} checked={this.state.mode === "open"}/>
                <label htmlFor="open">Open</label>
              </div>
              <div>
                <input type="radio" id="close" name="mode" value="close" onChange={this.handleRadioChange} checked={this.state.mode === "close"}/>
                <label htmlFor="close">Close</label>
              </div>
          </div>
          <div className="submitBtn">
            <button type="submit" disabled={this.state.mode === null}>Start</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewGameModal;
