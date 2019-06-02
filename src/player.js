import * as waveformplaylist from 'waveform-playlist';
import * as EventEmitter from "event-emitter";

import React, { Component } from 'react'

export default class Player extends Component {
    constructor(){
        super();
        this.state={
          audio: false,
          file: null
        }
       
    var playlist = waveformplaylist.init({
            mono : true,
            container: document.getElementById('root')},
            EventEmitter());

            playlist.load([{
                src: 'music/Ahh.mp3',
                name: 'Ahh',
              },
              {
                src: 'music/Almost.mp3',
                start: 2,
              },
              {
                src: 'music/Ballad.mp3',
                start: 4,
                
              }])
              .then(()=> {
                  console.log('lolololol');
                  playlist.play();
                  setTimeout(()=>{playlist.pause()},2000)

      console.log(playlist.getEventEmitter());                  
                  // this.ee = playlist.getEventEmitter().__ee__;
                  // console.log(this.ee);
                  
                  playlist.getEventEmitter().__ee__.startaudiorendering("buffer");
                  playlist.getEventEmitter().on("audiorenderingfinished", (type, data) => {
      const rendered = new File([data], "episode.mp3", { type: "audio/mp3" });
      console.log(rendered);
      this.setState({audio: true})
      const downloadUrl= window.URL.createObjectURL(rendered);
      console.log(downloadUrl );
      
      return downloadUrl;
              })
        
    }
              )}

    
    
    render() {
      if(this.state.audio){
        return (
            <div>
                {/* `{this.displayDownloadLink(this.downloadUrl)}` */}
                  
            
            </div>
        )}
        else{
          return (
            <div>
              <h1>Loading..</h1>
            </div>
          )
        }
    }
  }