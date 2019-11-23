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
  componentDidMount() {
    this.props.sendRefs(this)
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
    const drumKeys = this.state.keys.map(key => {
      return `${key}_ref`;
    });
    const desiredRefs = Object.keys(refs).filter(key => {
      return drumKeys.includes(key)
    });
    desiredRefs.forEach(item => {
      this.setState({
        [`${item}`]: refs[`${item}`]
      })
    })
  }
  handleBtnClick = async name => {
    try {
      await this.state[`${name}_ref`].current.play()
    } catch (error) {
      console.log(error)
    }
  }
  handleKeyPress = async event => {
    const pressedKey = capitalize(event.key);
    if (this.state.keys.includes(pressedKey)) {
      try {
        await this.state[`${pressedKey}_ref`].current.play()
      } catch (error) {
        console.log(error)
      }
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