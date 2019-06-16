import React, { Component } from 'react'
import Player from './player';

export default class Dashboard extends Component {


    state = {
        audio: false,
        data: [
          {
            src: "music/Almost.mp3",
            start: 2
          },
          {
            src: "music/Ballad.mp3",
            start: 4
          }
        ]
      };

    addSongs = (e) => {
        e.preventDefault()
        const data = [
            {
                src: "music/Anthem.mp3",
                start:1
              },
              {
                src: "music/Almost.mp3",
                start: 2
              },
              {
                src: "music/Ballad.mp3",
                start: 4
              }
        ]
        this.setState({audio:true})
    }
    
    
    render() {
        return (
            <div>
                <button
          onClick={e => {
            this.addSongs(e)
          }}
        />
                <Player songs={this.state.data} play={this.state.audio}/>
            </div>
        )
    }
}
