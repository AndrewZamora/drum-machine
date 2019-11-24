import React, { Component } from 'react'
import clap_audio from './audio/clap.wav';

const capitalize = str => {
  return typeof str === 'string' ? str.charAt(0).toUpperCase() + str.slice(1) : '';
};

class DrumPad extends Component {
  constructor(props) {
    super(props);
    const allRefs = {}
    this.props.keys.forEach(key => {
      this[`${key}_ref`] = React.createRef();
      allRefs[`${key}_ref`] = this[`${key}_ref`];
    });
    this.props.sendRefs(allRefs);
  }
  render() {
    const { click, keys } = this.props;
    const pad = keys.map((key, index) => {
      return (
        <button
          className="drum-pad"
          id={key + "_btn"}
          key={index + key}
          onClick={() => click(key)}>
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
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }
  getRefs = refs => {
    this.setState({
      refs: refs
    });
  }
  playAudio = async key => {
    try {
      await this.state.refs[`${key}_ref`].current.play()
    } catch (error) {
      console.log(error)
    }
  }
  handleBtnClick = key => {
    this.playAudio(key);
  }
  handleKeyPress = event => {
    const pressedKey = capitalize(event.key);
    if (this.state.keys.includes(pressedKey)) {
      this.playAudio(pressedKey);
    }
  }
  render() {
    return (
      <main id="drum-machine">
        <div id="display">
          <DrumPad
            click={name => this.handleBtnClick(name)}
            sendRefs={ref => this.getRefs(ref)}
            keys={this.state.keys} />
        </div>
      </main>
    )
  }
}


export default App;