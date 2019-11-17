import React, { Component } from 'react'

const DrumPad = props => {
  const { func } = props;
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
      <button className="drum-pad" id={btn.name + "_btn"} key={index + btn.name} onClick={func(btn.name + "_ref")}>
        {btn.name}
        <audio ref={btn.name + "_ref"} id={btn.name} className="clip" src="Cymatics - Cobra Clap 12.wav" type="audio/wav"></audio>
      </button>
    )
  });
  return (
    <div>
      {pad}
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"]
    };
  }
  onClick = audio => {
    audio.current.play();
  }
  render() {
    return (
      <main id="drum-machine">
        <div id="display">
          <DrumPad func={() => this.onClick} />
        </div>
      </main>
    )
  }
}


export default App;
