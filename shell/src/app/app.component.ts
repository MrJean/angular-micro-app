import { Component, OnInit } from '@angular/core';
import '../../../client-c/dist';
import { StateService } from './state.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private stateService: StateService) {}

  config = {
    "client-a": {
      loaded: false,
      path: 'client-a/main.js',
      element: 'client-a'
    },
    "client-b": {
      loaded: false,
      path: 'client-b/main.js',
      element: 'client-b'
    },
    "client-d": {
      loaded: false,
      path: 'client-d/client-d.js',
      // scripts: ['https://unpkg.com/vue']
    }
  };

  ngOnInit() {
    this.load('client-a');
    this.load('client-b');
    // this.load('client-c');
    this.load('client-d');
  }

  load(name: string): void {

    const configItem = this.config[name];
    if (configItem.loaded) {
      return;
    }

    const content = document.getElementById('content');

    // if (configItem.scripts) {
    //   configItem.scripts.map((src) => {
    //     const script = document.createElement('script');
    //     script.src = src;
    //     content.appendChild(script);
    //   });
    // }

    const script = document.createElement('script');
    script.src = configItem.path;
    content.appendChild(script);

    if (configItem.element) {
      const element: HTMLElement = document.createElement(configItem.element);
      content.appendChild(element);

      element.addEventListener('message', msg => this.handleMessage(msg));
      element.setAttribute('state', 'init');

      script.onerror = () => console.error(`error loading ${configItem.path}`);

      this.stateService.registerClient(element);
    }
  }

  handleMessage(msg): void {
    console.debug('shell received message: ', msg.detail);
  }

}
