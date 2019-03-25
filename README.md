# Angular Micro App setup

**Credits go to the magnificent work of Manfred Steyer.**

## Serving the Angular shell and clients

```
ng serve --project shell --open
ng serve --project client-a --open
ng serve --project client-b --open
```

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
            ...
        },
        "serve": {
            "builder": "ngx-build-plus:dev-server",
            "scripts": [
                "node_modules/@webcomponents/custom-elements/src/native-shim.js"
            ],
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
```