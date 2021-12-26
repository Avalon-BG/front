import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RolesComponent } from './components/roles/roles.component';
import { GameComponent } from './components/game/game.component';
import { AudioComponent } from './components/audio/audio.component';
import * as reducers from './store/reducers';
import { GenericTurnComponent } from './components/dynamic-turns/generic-turn/generic-turn.component';
import { GameEffects } from './store/effects/game.effects';
import { DialogComponent } from './components/game/dialog/dialog.component';
import { VoteTurnComponent } from './components/dynamic-turns/vote-turn/vote-turn.component';
import { EndTurnComponent } from './components/dynamic-turns/end-turn/end-turn.component';
import { metaReducers } from './store/reducers/meta-reducer';
import { EndGameComponent } from './components/end-game/end-game.component';
import { ButtonComponent } from './button/button.component';
import { OverviewComponent } from './components/overview/overview.component';
import { RoleDialogComponent } from './components/game/role-dialog/role-dialog.component';
import { QuestDialogComponent } from './components/game/quest-dialog/quest-dialog.component';
import { RevealComponent } from './components/reveal/reveal.component';
import { ICONS } from '../assets/icons';
import { MATERIAL_MODULES } from './material.module';
import { LangSwitchComponent } from './components/lang-switch/lang-switch.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    RolesComponent,
    GameComponent,
    AudioComponent,
    GenericTurnComponent,
    DialogComponent,
    VoteTurnComponent,
    EndTurnComponent,
    EndGameComponent,
    ButtonComponent,
    OverviewComponent,
    RoleDialogComponent,
    QuestDialogComponent,
    RevealComponent,
    LangSwitchComponent,
    ...ICONS
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ game: reducers.reducer }, { metaReducers }),
    EffectsModule.forRoot([GameEffects]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    ...MATERIAL_MODULES
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
