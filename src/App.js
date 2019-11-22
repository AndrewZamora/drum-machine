import React, { Component } from 'react'
import clap_audio from './audio/clap.wav';

const capitalize = (str) => {
  return typeof str === 'string' ? str.charAt(0).toUpperCase() + str.slice(1) : '';
};

class DrumPad extends Component {
  render() {
    const { func } = this.props;
    const drumBtns = [
      {
        name: "Q"
      },
      {
        name: "W"
      },
      {
        name: "E"
      },
      {
        name: "A"
      },
      {
        name: "S"
      },
      {
        name: "D"
      },
      {
        name: "Z"
      },
      {
        name: "X"
      },
      {
        name: "C"
      }
    ]
    const pad = drumBtns.map((btn, index) => {
      return (
        <button
          className="drum-pad"
          id={btn.name + "_btn"}
          key={index + btn.name}
          onKeyPress={(event) => func(event, this[btn.name])}
          onClick={(event) => func(event, this[btn.name])}>
          {btn.name}
          <audio ref={audio => (this[btn.name] = audio)} id={btn.name} className="clip" src={clap_audio} type="audio/wav"></audio>
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
  onClick = async (event, ref) => {
    console.log(event,ref.id)
    if (event.key) {
      console.log(event.key,)
    }
    try {
      await ref.play()
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <main id="drum-machine">
        <div id="display">
          <DrumPad func={(event, ref) => this.onClick(event, ref)} />
        </div>
      </main>
    )
  }
}


export default App;
