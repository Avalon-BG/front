import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { GenericTurnComponent } from '../generic-turn/generic-turn.component';
import { State } from '../../../store/reducers';
import * as actions from '../../../store/actions/actions';
import * as selectors from '../../../store/reducers/selectors';

@Component({
  selector: 'app-audio-turn',
  templateUrl: './audio-turn.component.html',
  styleUrls: ['./audio-turn.component.scss'],
  host: { class: 'component-container dynamic-turns' }
})
export class AudioTurnComponent extends GenericTurnComponent implements OnInit, OnDestroy {


  private gameId: string;
  audioContext: AudioContext;
  buffer: AudioBuffer;
  loading: boolean;
  playing: boolean;
  source: any;

  constructor(private _store: Store<State>) {
    super(_store);
    this.loading = true;
    this.playing = false;
    this.audioContext = new AudioContext();
  }

  ngOnInit() {
    this._store.pipe(select(selectors.selectGameId)).subscribe(id => {
      this.gameId = id;
      this._store.dispatch(actions.getAudio({ gameId: this.gameId }));
    });

    this._store.pipe(select(selectors.selectAudio)).subscribe(audio => {
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


  playAudio() {
    this.stopAudio();
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.audioContext.destination);
    this.source.start(0);
  }

  stopAudio() {
    if (this.source) {
      this.source.stop();
    }
  }

  playGame() {
    this.stopAudio();
    this.finished();
  }

}
