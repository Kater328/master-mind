import React from 'react';
import { colors } from '../const';

class UserInputModal extends React.Component {
  constructor(props) {
    super(props);
    this.names = ["input1", "input2", "input3", "input4"];

    this.state = {
      input1: null,
      input2: null,
      input3: null,
      input4: null,
    };
  }

  submitForm = () => {
    this.props.onInputChange([this.state.input1, this.state.input2, this.state.input3, this.state.input4]);
  }

  navigateBack = () => {
    this.props.onBackNavigate();
  }

  checkValues() {
    return this.state.input1 && this.state.input2 && this.state.input3 && this.state.input4;
  }

  handleSelecting(evt, name) {
    this.setState({[name]: colors[evt.target.selectedIndex - 1]});
  }

  getButtonContent(isAllSelected) {
    return isAllSelected ? "Start" : "Please select all colors";
  }

  renderCircle(color) {
    return <div className="circle" style={{backgroundColor: color}}></div>;
  }

  renderOptions(name) {
    return (
      <select name={name} id={name} defaultValue="-" onChange={(evt) => this.handleSelecting(evt, name)}>
        <option value="-" key={name}>-</option>
        {colors.map(col => <option value={col} key={name+col}>{col}</option>)}
      </select>
    );
  }

  render() {
    const isAllSelected = this.checkValues();
    return (
      <div className="modal">
        <form onSubmit={this.submitForm}>
          <button className="backBtn" onClick={this.navigateBack}>←</button>
          <div className="title">Create Pattern</div>
          <div className="content">
            Choose the colors for each circle, which will be the hidden cipher. After that we can start the game.
            <div className="columns">
              {this.names.map(el => 
                <div className="columnItems" key={el}>
                  {this.renderCircle(this.state[el])}
                  {this.renderOptions(el)}
                </div>
              )}
            </div>
          </div>
          <div className="submitBtn">
            <button type="submit" disabled={!isAllSelected}>{this.getButtonContent(isAllSelected)}</button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserInputModal;
