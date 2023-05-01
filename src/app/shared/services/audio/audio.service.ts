import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  public playAudioBattle(){
    const audio = new Audio();
    audio.src = "../../../../assets/audio/pokemon-battle.mp3";
    audio.load;
    audio.play();
  }

  public playAudioCaught(){
    const audio = new Audio();
    audio.src = "../../../../assets/audio/caught-a-pokemon.mp3";
    audio.load;
    audio.play();
  }

  public playAudioClick(){
    const audio = new Audio();
    audio.src = "../../../../assets/audio/click2.mp3";
    audio.load;
    audio.play();
  }
}
