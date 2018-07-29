import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {NewAppComponent} from 'src/app/newApp.component';
import {CounterEffects, counterReducer} from 'src/app/newStore';

@NgModule({
  declarations: [
    NewAppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({counter: counterReducer}),
    EffectsModule.forRoot([CounterEffects])
  ],
  providers: [],
  bootstrap: [NewAppComponent]
})
export class AppModule {
}
