import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { State } from '../../../store/reducers';
import * as actions from '../../../store/actions/actions';
import * as selectors from '../../../store/reducers/selectors';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
  host: { class: 'component-container' }
})
export class AudioComponent implements OnInit, OnDestroy {

  private gameId: string;
  audioContext: AudioContext;
  buffer: AudioBuffer;
  loading: boolean;
  playing: boolean;
  pausedAt = 0;
  startedAt: number;
  source: AudioBufferSourceNode;

  constructor(private router: Router, private store: Store<State>, private configService: ConfigService) {
    this.loading = true;
    this.playing = false;
    const contextClass = (window.AudioContext ||
      window.webkitAudioContext ||
      window.mozAudioContext ||
      window.oAudioContext ||
      window.msAudioContext);
    if (contextClass) {
      // Web Audio API is available.
      this.audioContext = new contextClass();
    } else {
      throw new Error('No audio context');
    }
  }

  ngOnInit() {
    this.store.pipe(select(selectors.selectGameId)).subscribe(id => {
      if (!!id) {
        this.gameId = id;
        this.store.dispatch(actions.getAudio({ gameId: this.gameId }));
      }
    });

    this.store.pipe(select(selectors.selectAudio)).subscribe(audio => {
      if (this.gameId && audio) {
        this.audioContext.decodeAudioData(audio, (buffer) => {
            this.buffer = buffer;
          },
          (err) => {
            console.log(err, 'decodeAudioError');
          });
        this.loading = false;
      }
    });

  }

  ngOnDestroy(): void {
    this.source = undefined;
    this.audioContext = undefined;
  }


  pauseAudio() {
    if (this.playing && this.source) {
      this.stopAudio();
    } else {
      this.playing = true;
      this.playAudio();
    }
  }

  playAudio() {
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.audioContext.destination);
    this.startedAt = Date.now();
    this.source.start(0, this.pausedAt ? this.pausedAt / 1000 : 0);
    this.source.addEventListener('ended', () => {
      if (this.playing) {
        this.startedAt = 0;
        this.pausedAt = 0;
        this.playing = false;
      }
    });
  }

  stopAudio() {
    this.playing = false;
    this.pausedAt += Date.now() - this.startedAt;
    if (this.source) {
      try {
        this.source.stop();
      } catch (e) {
        console.log('Error when stopping audio', e);
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/reveal', this.gameId]);
  }

  playGame() {
    this.stopAudio();
    this.router.navigate(['/games', this.gameId]);
  }

}
