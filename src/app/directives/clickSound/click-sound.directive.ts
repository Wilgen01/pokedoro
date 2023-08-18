import { Directive, HostListener, inject } from '@angular/core';
import { AudioService } from 'src/app/shared/services/audio/audio.service';

@Directive({
  selector: '[appClickSound]'
})
export class ClickSoundDirective {

  private readonly audioService = inject(AudioService)

  @HostListener('click', ['$event']) onclick(){
    this.audioService.playAudioClick();
  }

}
