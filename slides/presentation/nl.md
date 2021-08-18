
## Angular & RxJS

#### Hands on!

-----

## Inhoud

- Download en Installatie 
- Angular CLI
- Project structuur
- Typescript decorators
- Hands-on opdrachten

-----

## Installatie

---

## Github repo

https://github.com/mhollink/angular-hands-on

---

## Node modules

```
cd handson
npm install
```

-----

## Angular CLI

---

#### Starten van een project

```
ng new '<app-naam>'
```

---

#### Aanmaken component, services & meer

```
ng generate component '<naam>'
ng generate service '<naam>'
ng generate pipe '<naam>'
ng generate directive '<naam>'
```

---

#### Afkortingen

```
ng g c '<naam>'
ng g s '<naam>'
ng g p '<naam>'
ng g d '<naam>'
```

---

#### Starten van het project

```
ng serve
```

---

#### Builden van het project

```
ng build
```

---

#### Unit testen draaien

```
ng test
```

---

#### Binnen een *NX* workspace

```
nx generate '<schema>' '<naam>'
```

-----

## Project sturctuur

---

#### Hoofdmap

```text
+---exercises
|        opdracht-1.md
|        opdracht-2.md
|        opdracht-etc.md
+---handson
|        angular.json
|        package.json
|        proxy.conf.json
|   +---apps
|       +---client
|       |   \---src          <-- Hier bevind zich de Angular app
|       \---server
|           \---src
\---slides
```

---

#### Client

```text
\---handson
    \---apps
        \---client
            \---src
                |   index.html
                |   styles.scss
                |   main.ts
                +---app
                |   |       app.component.html
                |   |       app.component.ts
                |   |       app.module.ts
                |   \---material
                \---environments
                        environment.ts
```

-----

## Typescript decorators

---

#### Angular decorators

Angular maakt gebruik van decorators boven classes of variabele om aan te geven wat een component of een services is.

---

#### Angular decorators

```typescript
@NgModule({
})
export class AppModule {
}
```

```typescript
@Component({
})
export class AppComponent {
}
```

```typescript
@Injectable({
})
export class AppService {
}
```


---

#### Angular decorators

```typescript
export class AppComponent {
    @Input()
    public field: string;
    @Output()
    public submit: EventEmitter;
}
```

-----

## Hands On!

---

#### Aanpassen Proxy

Urls naar /api verwijzen naar lokale server. 

```json
{
  "/api/*": {
    "target": "http://localhost:3333",
    "secure": false,
    "logLevel": "debug"
  }
}
```

---

#### Aanpassen Proxy

Verander localhost voor `devw10-00658` zodat we de zeflde backend gebruiken

```json
{
  "/api/*": {
    "target": "http://devw10-00658:3333",
    "secure": false,
    "logLevel": "debug"
  }
}
```

Gebruik ook `devw10-00658` in opdracht 6.
