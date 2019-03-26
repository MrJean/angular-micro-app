# Angular Micro App setup

**Credits go to the magnificent work of Manfred Steyer.**

## Serving the Angular shell and clients

```
ng serve --project shell --open
ng serve --project client-a --open
ng serve --project client-b --open
```

Available application paths:

* /#/client-a
* /#/client-a/flights
* /#/client-b
* /#/client-b/cart

## Client projects configuration

### ngx-build-plus

The client projects' configuration must be adapted to use the `ngx-build-plus` plugin.

**Note:** Make sure the shell application uses the regular Angular commands.

```
"client-x": {
    ...
    "architect": {
        "build": {
            "builder": "ngx-build-plus:build",
            "options": {
                "scripts": [
                    "node_modules/@webcomponents/custom-elements/src/native-shim.js"
                ],
                ...
            },
            ...
        },
        "serve": {
            "builder": "ngx-build-plus:dev-server",
          ...
        },
        ...
    }
}
```

### Web Components Custom Elements

After installing `@webcomponents/custom-elements` add the following line to the client(s) `scripts` property.

```
"client-x": {
    ...
    "architect": {
        "build": {
            "options": {
                "scripts": [
                    "node_modules/@webcomponents/custom-elements/src/native-shim.js"
                ],
                ...
            },
          ...
        },
        ...
    }
}
```

### Client default components

Each client must contain both a **core** and **empty** component.

```
ng g c core --project client-x
ng g c empty --project client-x
```

#### Core component

Will be used to route incoming addresses to the corresponding child component (e.g. client-x/child-route).
This means it's template must contain a router outlet.

#### Empty component

The empty component can be seen as a 404 component that will catch all routes that don't match a defined route.
It's completely up to you how you will implement this component.

Adapt **app.module.ts** the following way to start using these components.

```
@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'client-x', component: CoreComponent, children: [
                    { path: 'child-route', component: DummyComponent },
                ]
            },
            { path: '**', component: EmptyComponent }
        ], { useHash: true }),
    ],
})
```

## Registering a component as Custom Element

First of all, make sure **encapsulation** on your component you want to set as Custom Element is set to **ViewEncapsulation.Emulated**. Also remove the **selector** property.

You'll need to add **CUSTOM_ELEMENTS_SCHEMA** in app.module of your client and add the component you'll expose a a custom element in the **entryComponents** property.

```
@NgModule({
    declarations: [
        AppComponents,
    ]
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [
        AppComponent,
    ],
})
```

Now let's register your custom element. Make sure to add the **Injector** to your constructor and import it from **@angular/core**.

```
export class AppModule { 
    constructor(private injector: Injector) {
    }

    ngDoBootstrap() {
        const appElement = createCustomElement(AppComponent, { injector: this.injector});
        customElements.define('client-x', appElement);
    }
}
```