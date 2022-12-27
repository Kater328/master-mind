import React from 'react';

class VictoryInfoModal extends React.Component {
  
  renderCircle(color, step, index) {
    return <div key={step + index + color} className="circle" style={{backgroundColor: color}}></div>;
  }

  render() {
    if (!this.props.result) return null;
    return (
      <div className="backdrop">
        <div className="modal">
          <div className="title">VICTORY!</div>
          <div className="columns">
            It took me {this.props.result.steps - 1} steps to guess your cipher:
          </div>
          <div className="columns">
            {this.props.result.colors.map((el, index) => this.renderCircle(el, 'f', index))}
          </div>
          <div className="submitBtn">
            <button onClick={this.props.startNewGame}>Start New Game</button>
          </div>
        </div>
      </div>
    );
  }
}

export default VictoryInfoModal;
