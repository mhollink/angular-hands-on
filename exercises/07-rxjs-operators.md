# RxJS Operators.

Within the log we see the messageEvent object. This object contains a lot of information which is of no use for us.
With RxJS we can use some operators to extract and transform the data. We can do this to ensure we expose only the 
necessary data to our chat page. To do so, use the pipe method prior to subscribing to the subject in the connect-method.

```typescript
this.subject
    .pipe()        
    .subscribe(payload => {
        console.log(payload);
    })
```

The pipe method can be used to invoke multiple different operators available from `rxjs/operators`. In this case we 
can use the map function to transform (or map) the incoming object to another object. 

First of all, the message event contains a data property which contains the message from the server. To extract this 
from the incoming messageEvent we can use the map operator.

```typescript
this.subject
    .pipe(
        map(messageEvent => messageEvent.data),
    )        
    .subscribe(payload => {
        console.log(payload);
    })
```

The payload now contains a json-string that contains the message. To transform this string to a workable json we can 
use the map function again with the build-in parse function: 

```typescript
map(eventData => JSON.parse(eventData))
```

With the combination of these 2 map functions the payload in the console log should contain a json object with a message
telling you that you are connected.

-----

[<< next exercise: Current value >>](./08-rxjs-behaviour-subject.md)
