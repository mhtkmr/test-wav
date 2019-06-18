import React, { Component } from "react";
import Player from "./player";

export default class Dashboard extends Component {
  state = {
    audio: false,
    vol: 0.1,
    data: [
      {
        src: "music/Almost.mp3",
        start: 2,
        gain: 0
      },
      {
        src: "music/Ballad.mp3",
        start: 4,
        gain: 0
      }
    ]
  };

  handleVol = e => {
    e.preventDefault();

    const data = this.state.data;
    // data.map((i) => {
    //     i.gain = e.target.value / 100;
    //     console.log(i.gain);

    // })

    this.setState({ vol: e.target.value / 100 });
  };

  addSongs = e => {
    const audio = !this.state.audio;
    this.setState({ audio });
  };

  render() {
    return (
      <div>
        <button
          onClick={e => {
            this.addSongs(e);
          }}
        >
          Play
        </button>
        <input type="range" min="1" max="10" onChange={this.handleVol} />
        <Player
          songs={this.state.data}
          play={this.state.audio}
          vol={this.state.vol}
        />
      </div>
    );
  }
}
