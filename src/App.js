import React, { Component } from 'react'
// AUDIO Tracks are from Cymatics - Cobra Hip Hop Sample Pack => https://cymatics.fm/pages/cobra-hip-hop-sample-pack
const cymbals = 'https://res.cloudinary.com/diqrplcm8/video/upload/v1581511236/Cymatics_-_Cobra_Ride_2_gthyh0.wav';
const kick  = 'https://res.cloudinary.com/diqrplcm8/video/upload/v1581511139/Cymatics_-_Cobra_Kick_2_-_C_duddbe.wav' 
const clap = 'https://res.cloudinary.com/diqrplcm8/video/upload/v1581510946/clap_jxfclx.wav';
const snares = 'https://res.cloudinary.com/diqrplcm8/video/upload/v1581511643/Cymatics_-_Cobra_Rimshot_Snare_6_n2y8k8.wav';
const snap = 'https://res.cloudinary.com/diqrplcm8/video/upload/v1581511795/Cymatics_-_Cobra_Snap_5_bfcnnh.wav';
const percussion = 'https://res.cloudinary.com/diqrplcm8/video/upload/v1581512216/Cymatics_-_Cobra_Percussion_24_qiwrdz.wav';
const eight08 = 'https://res.cloudinary.com/diqrplcm8/video/upload/v1581512454/Cymatics_-_Cobra_808_16_-_G_qkenis.wav';
const crash = 'https://res.cloudinary.com/diqrplcm8/video/upload/v1581512826/Cymatics_-_Cobra_Crash_7_jxpgwg.wav';
const highHat = 'https://res.cloudinary.com/diqrplcm8/video/upload/v1581513237/Cymatics_-_Cobra_Open_Hihat_13_xt0os1.wav';
// GLOBALS
const hardCodedKeys = [{ name: "Q", audio: cymbals, description: "cymbals" }, { name: "W", audio: clap, description: "clap" }, { name: "E", audio: kick, description: "kick" }, { name: "A", audio: snares, description: "snares" }, { name: "S", audio: snap, description: "snap" }, { name: "D", audio: percussion, description: "percussion" }, { name: "Z", audio: eight08, description: "808" }, { name: "X", audio: crash, description: "crash" }, { name: "C", audio: highHat, description: "highhat" }];
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
          className={`drum-pad btn-${index}`}
          id={key.name + "_btn"}
          key={index + key.name}
          onClick={() => click(key.name)}>
          {key.name}
          <audio ref={this[`${key.name}_ref`]} id={key.name} className="clip" src={key.audio} type="audio/wav"></audio>
        </button>
      )
    });
    return (
      <div className="drum-pad-container">
        {pad}
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: hardCodedKeys,
      display: ''
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
  getKeyDescription = keyName => {
    const [match] = this.state.keys.filter(key => {
      return keyName === key.name;
    });
    return match.description;
  };
  playAudio = key => {
    try {
      this.state.refs[`${key}_ref`].current.play();
    } catch (error) {
      console.log(error);
    };
  };
  handleBtnClick = key => {
    this.setState({
      display: this.getKeyDescription(key)
    });
    this.playAudio(key);
  };
  handleKeyPress = async event => {
    const keys = this.getKeyNames();
    const pressedKey = event.key.toUpperCase();
    if (keys.includes(pressedKey)) {
      this.setState({
        display: this.getKeyDescription(pressedKey)
      });
      this.playAudio(pressedKey);
    }
  };
  render() {
    return (
      <main id="drum-machine">
        <div id="display" className="display">{this.state.display}</div>
        <DrumPad
          click={name => this.handleBtnClick(name)}
          sendRefs={ref => this.getRefs(ref)}
          keys={this.state.keys} />
      </main>
    )
  };
}


export default App;