import * as waveformplaylist from 'waveform-playlist';
import * as EventEmitter from "event-emitter";

import React, { Component } from 'react'

export default class Player extends Component {
    constructor(){
        super();
        this.state={
          audio: false,
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
                  playlist.initExporter();

      console.log(playlist.getEventEmitter());                  
                  // this.ee = playlist.getEventEmitter().__ee__;
                  // console.log(this.ee);
                  
                  playlist.getEventEmitter().__ee__.startaudiorendering("wav");
                  playlist.getEventEmitter().on("audiorenderingfinished", (type, data) => {
      const rendered = new File([data], "episode.mp3", { type: "audio/mp3" });
      console.log(rendered);
      this.setState({audio: true})
      const downloadUrl= window.URL.createObjectURL(rendered);
      var parent=document.getElementById("n");
      var child=document.createElement("a");
          child.setAttribute('href',downloadUrl);
          child.setAttribute('download','gg.wav');
          parent.appendChild(child);
          child.innerHTML=downloadUrl;
      
      return downloadUrl;
              })
        
    }
              )}

    
    
    render() {
      if(this.state.audio){
        return (
            <div id = "n">

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