import React from 'react';
import { colors } from '../const';

class UserInfoModal extends React.Component {
  submitForm = () => {
    this.props.onStart();
  }

  navigateBack = () => {
    this.props.onBackNavigate();
  }

  render() {
    return (
      <div className="modal">
        <form onSubmit={this.submitForm}>
          <button className="backBtn" onClick={this.navigateBack}>←</button>
          <div className="title">Create Pattern</div>
          <div className="content">
            There are six colors available:
            <div className="columns">
              {colors.map(el => 
                <div key={el} className="columnItems">
                  <div className="circle" style={{backgroundColor: el}}></div>
                  {el}
                </div>
              )}
            </div>
            You need to compose and remember the code, which will consist of four values that can be repeated. After that we can start the game.
            <div className="columns">
              {["1", "2", "3", "4"].map((el) => <div key={el} className="circle"></div>)}
            </div>
          </div>
          <div className="submitBtn">
            <button type="submit">Start</button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserInfoModal;
