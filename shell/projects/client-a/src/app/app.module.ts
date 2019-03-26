import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { FlightsWidgetComponent } from './flights-widget/flights-widget.component';
import { CoreComponent } from './core/core.component';
import { EmptyComponent } from './empty/empty.component';
import { RouterModule } from '@angular/router';
import { FlightsComponent } from './flights/flights.component';
import { PushPipe } from './push.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FlightsWidgetComponent,
    CoreComponent,
    FlightsComponent,
    EmptyComponent,
    PushPipe,
    FlightsWidgetComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'client-a', component: CoreComponent, children: [
          { path: 'flights', component: FlightsComponent },
        ]
      },
      { path: '**', component: EmptyComponent }
    ], { useHash: true }),
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    AppComponent,
    FlightsWidgetComponent,
  ]
})
export class AppModule {

  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const appElement = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('client-a', appElement);

    const flightsWidgetComponent = createCustomElement(FlightsWidgetComponent, { injector: this.injector });
    customElements.define('client-a-flights-widget', flightsWidgetComponent);
  }
}
