# react-boilerplate

Zeal's boilerplate setup for React/Redux projects.

This boilerplate contains our standard React/Redux setup for larger single-page front-end applications.

We expect that the front-end application will be embedded into a project along with the back-end application, likely in Rails.  The boilerplate is structured based on that assumption.

The boilerplate includes all of the tools that we're currently using in our React projects; you may not need all of it, so feel free to remove the parts that you don't need.

We assume some familiarity with the React/Redux ecosystem, including Babel and Webpack.

## Notes of Interest

* We include `flux-standard-action` to indicate that our intention is to use that format for our actions.  We don't currently import it anywhere, but if you're so inclined, you can use its `isFSA()` function to check your actions in tests or as a guard in the reducer returned from `createReducer()`.

## License

Copyright (c) 2016 Zeal, LLC.  Licensed under the [MIT license](https://opensource.org/licenses/MIT).
