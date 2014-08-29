## signal
A small (~1KB Minified and GZipped) and fast JavaScript event system. Great as a pubsub or to add event emitters to your code.

## How to use
Bind a function in a jquery-like fashion to Singal using `on` or `bind`.
```javascript
signal.on('basic', function(arg) {
	console.log('args: ', arg);
});

// logs "args: 1"
signal.trigger('basic', 1);
```
Define a namespace with a `.`
```javascript
signal.on('ns-event.mine', function(one, two, three) {
	console.log('args: ', one, two, three);
});

// logs "args: 3 2 1"
signal.trigger('ns-event', 3, 2, 1);
```
another example
```javascript
signal.on('example', function(word) {
	console.log('hi ', word);
})
.on('example.bye', function(word) {
	console.log('bye ', word);
});

// logs "hi John", "bye John"
signal.trigger('example', 'John');
// only logs "bye John"
signal.trigger('example.bye', 'John');
```

`once` can also be used.
```javascript
signal.once('bam', function() {
	console.log('Boom!');
});

// logs "Boom!"
signal.trigger('bam')
	// nothing is logged
	.trigger('bam');
```

##### Off:
Use `off` or `unbind` to unbind events.
```javascript
signal.on('example.foo', function() {});

// Unbinds the event
signal.off('example.foo');
// Unbinds all .foo namespaced events
signal.off('.foo');
```

## Handles
Handles define another level of scope to events. The scope of the handle protects them from collission of other events (or even namespaces). Define a handle with a `:`.
```javascript
// "change:" is the handle for the event "name"
signal.on('change:name', function(name) {
	console.log('name changed to: ', name);
});

// This event is in a different scope...
signal.on('name', function(name) {
	console.log('hi ', name);
});

// ...so that when we trigger it, we don't trigger
// the event with the handle. This logs "hi Bill".
signal.trigger('name', 'Bill');

// logs "name changed to: David"
signal.trigger('change:name', 'David');
```

Scoped handles also protect against the unbinding of events.
```javascript
signal.on('change:title.ns', function() {});
signal.on('title.ns', function() {});

// Unbinds "title.ns" but not "change:title",
// even though "change:title" has the same namespace
// it is in a different scope
signal.off('.ns');

// Now all events under the "change" handle with
// the "ns" namespace are unbound
signal.off('change:.ns');
```

Handles can also be activated and deactivated. Useful for persistent modules that need to be enabled and disabled. Instead of the overhead of unbinding and rebinding, the handle can be toggled.
```javascript
// "click" handle that we probably don't want to
// have fired when our module is hidden...
signal.on('click:button', function() {
	console.log('click!');
});

// ...so we'll disable it
signal.disable('click');

// This doesn't log anything cause the
// handle has been disabled
signal.trigger('click:button');

// Enable the handle and now we can trigger
// the event. Logs "click!"
signal.enable('click').trigger('click:button');
```

## Dispatch
For events that need to be even faster, use `subscribe` and `dispatch`. There are no handles or namespaces. `subscribe` will return an id for the subscription that will have to be passed to `unsubscribe` to unbind the event.
```javascript
// Subscribe to the tick event...which will be triggered 60 times a second
var id = signal.subscribe('tick', function(time) { console.log('tick'); });

// Dispatch the event
signal.dispatch('tick', Date.now());

// To unsubscribe, pass the event and the id
signal.unsubscribe('tick', id);
```

## Construct

## Extend
`signal` comes with a klass-like `extend` method.