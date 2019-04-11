# ResourcesLoader
Resources loading for HTML5 games. Written in JS.

# Usage
```javascript
resources.load(urlOrArray) // Load image by url or array of images.
```

```javascript
resources.onReady(function) // Calls callback when images finished loading.
```

```javascript
resources.get(url) // Returns image from buffer.
```

```javascript
resources.getReady() // Returns loaded images count. For example, for progress bar.
```

```javascript
resources.resourceCache // Image buffer array.
```

# Example

```javascript
resources.load([
  'res/object.png',
  'res/background.png'
]);
resources.onReady(function () {
  ctx.drawImage(resources.get('res/background.png'), 0, 0, canvas.width, canvas.height);
  ctx.drawImage(resources.get('res/object.png'), 500, 700, 100, 100);
})
```
