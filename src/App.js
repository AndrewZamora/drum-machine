import React, { Component } from 'react'
// AUDIO FILES
import clap from './audio/clap.wav';
import cymbals from './audio/Cymatics - Cobra Ride 2.wav';
import kick from './audio/Cymatics - Cobra Kick 2 - C.wav';
// COMPONENTS
class DrumPad extends Component {
  constructor(props) {
    super(props);
    const allRefs = {};
    this.props.keys.forEach(key => {
      this[`${key.name}_ref`] = React.createRef();
      allRefs[`${key.name}_ref`] = this[`${key.name}_ref`];
    });
    this.props.sendRefs(allRefs);
  };
  render() {
    const { click, keys } = this.props;
    const pad = keys.map((key, index) => {
      return (
        <button
          className="drum-pad"
          id={key.name + "_btn"}
          key={index + key.name}
          onClick={() => click(key.name)}>
          {key.name}
          <audio ref={this[`${key.name}_ref`]} id={key.name} className="clip" src={key.audio} type="audio/wav"></audio>
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
      keys: [{ name: "Q", audio: cymbals, description: "cymbals" }, { name: "W", audio: clap, description: "clap" }, { name: "E", audio: kick, description: "kick" }, { name: "A", audio: clap, }, { name: "S", audio: clap, }, { name: "D", audio: clap }, { name: "Z", audio: clap }, { name: "X", audio: clap }, { name: "C", audio: clap }]
    };
  };
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  };
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  };
  getKeyNames = () => {
    return this.state.keys.map(key => key.name);
  };
  getRefs = refs => {
    this.setState({
      refs: refs
    });
  };
  playAudio = key => {
    try {
      this.state.refs[`${key}_ref`].current.play()
    } catch (error) {
      console.log(error);
    }
  };
  handleBtnClick = key => {
    this.playAudio(key);
  };
  handleKeyPress = async event => {
    const keys = this.getKeyNames();
    const pressedKey = event.key.toUpperCase();
    if (keys.includes(pressedKey)) {
      this.playAudio(pressedKey);
    }
  };
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
  };
}


export default App;