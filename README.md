# react-boilerplate

Zeal's boilerplate setup for React/Redux projects.

This boilerplate contains our standard React/Redux setup for larger single-page front-end applications.

We expect that the front-end application will be embedded into a project along with the back-end application, likely in Rails.  The boilerplate is structured based on that assumption.

The boilerplate includes all of the tools that we're currently using in our React projects; you may not need all of it, so feel free to remove the parts that you don't need.

We assume some familiarity with the React/Redux ecosystem, including Babel and Webpack.

## Notes of Interest

* We include `flux-standard-action` to indicate that our intention is to use that format for our actions.  We don't currently import it anywhere, but if you're so inclined, you can use its `isFSA()` function to check your actions in tests or as a guard in the reducer returned from `createReducer()`.

## Recipes

These are recipes for common things you might want to do, but that we don't really want in our standard boilerplate.

### Using jQuery

With React, jQuery is almost never necessary, so think twice before deciding to include it.

However, sometimes we want to wrap a third-party component that uses jQuery.  In that case, we don't have much choice, so here's how to include jQuery and make it globally available.

1. In [webpack/base.js](webpack/base.js), change:
```javascript
new webpack.ProvidePlugin({
  fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
})
```
to:
```javascript
new webpack.ProvidePlugin({
  fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
  jQuery: 'jquery',
  $: 'jquery'
})
```

This assumes that you've added jQuery to your `package.json` either directly or via another module.

2. In [.eslintrc.json](.eslintrc.json), add:
```json
"env": {
  "jquery": true
}
```

## License

Copyright (c) 2016 Zeal, LLC.  Licensed under the [MIT license](https://opensource.org/licenses/MIT).
