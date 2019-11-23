import React, { Component } from 'react'
import clap_audio from './audio/clap.wav';

const capitalize = str => {
  return typeof str === 'string' ? str.charAt(0).toUpperCase() + str.slice(1) : '';
};

class DrumPad extends Component {
  constructor(props) {
    super(props);
    props.keys.forEach(key => {
      this[`${key}_ref`] = React.createRef();
    });
  }
  render() {
    const { click, keys } = this.props;
    const pad = keys.map((key, index) => {
      return (
        <button
          className="drum-pad"
          id={key + "_btn"}
          key={index + key}
          onClick={(event) => click(event, this, key)}>
          {key}
          <audio ref={this[`${key}_ref`]} id={key} className="clip" src={clap_audio} type="audio/wav"></audio>
        </button>
      )
    });
    return (
      <div>
        {pad}
      </div>
    )
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"]
    };
  }
  handleBtnClick = async (event, ref, name) => {
    if (event.key && capitalize(event.key) === name) {
      console.log("YAY")
    }
    try {
      await ref[`${name}_ref`].current.play()
    } catch (error) {
      console.log(error)
    }
  }
  handleKeyPress = (event, ref, name) => {
    if (event.key && capitalize(event.key) === name) {
      console.log("YAY")
    }
  }
  render() {
    return (
      <main id="drum-machine">
        <div id="display">
          <DrumPad click={(event, ref, name) => this.handleBtnClick(event, ref, name)} keys={this.state.keys}/>
        </div>
      </main>
    )
  }
}


export default App;