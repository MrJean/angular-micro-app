import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreComponent } from './core/core.component';
import { EmptyComponent } from './empty/empty.component';

@NgModule({
  declarations: [
    AppComponent,
    CoreComponent,
    EmptyComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
