import * as waveformplaylist from "waveform-playlist";
import * as EventEmitter from "event-emitter";

import React, { Component } from "react";

export default class Player extends Component {
  state = {
    
    playlist: null,
 }
  componentWillMount() {
    const playlist = waveformplaylist.init(
      {
        mono: true,
        container: document.getElementById("root")
      },
      EventEmitter()
    );
    this.setState({ playlist });
  }
  onPause = () => {
    this.state.playlist.play();
  }
  onPlay = () => {
    this.state.playlist.pause();
  }
  onFile=(e)=> {
    
    this.initPlaylist();
  }

  addToPlaylist(file) {
    this.state.playlist.load();
    this.state.playlist.getEventEmitter().__ee__.startaudiorendering("wav");
  }

  initPlaylist = audio => {
    // const playlist = waveformplaylist.init(
    //   {
    //     mono: true,
    //     container: document.getElementById("root")
    //   },
    //   EventEmitter()
    // );
    try {
      this.state.playlist.load(this.props.songs).then(() => {
        // this.setState({ playlist });
        console.log("lolololol");
        
        this.state.playlist.initExporter();

        this.ee = this.state.playlist.getEventEmitter().__ee__;

        this.state.playlist.getEventEmitter().__ee__.startaudiorendering("wav");
        this.state.playlist
          .getEventEmitter()
          .on("audiorenderingfinished", (type, data) => {
            const rendered = new File([data], "episode.mp3", {
              type: "audio/mp3"
            });
            console.log(rendered);
            // this.setState({ audio: true });
            // const downloadUrl = window.URL.createObjectURL(rendered);
            // var parent = document.getElementById("n");
            // var child = document.createElement("a");
            // child.setAttribute("href", downloadUrl);
            // child.setAttribute("download", "gg.wav");
            // parent.appendChild(child);
            // child.innerHTML = downloadUrl;

            // return downloadUrl;
          });
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        
        {this.initPlaylist()}
        {this.props.play?this.onPause():this.onPlay()}
      </div>
    );
  }
}
