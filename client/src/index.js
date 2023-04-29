import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';

import App from './App';

/* `const store = configureStore({ reducer: reducers });` is creating a Redux store using the
`configureStore` function from the `@reduxjs/toolkit` library. The `reducer` key in the
configuration object specifies the root reducer function that combines all the reducers in the
application. The `reducers` variable is likely an object that contains all the individual reducer
functions for the application. The resulting `store` object is then used to provide access to the
Redux store to all components in the application using the `Provider` component from the
`react-redux` library. */
const store = configureStore({
  reducer: reducers
});

const root = createRoot(document.getElementById('root'));
root.render(
  /* `<Provider store={store}>` is a component provided by the `react-redux` library that allows the
  Redux store to be accessed by all components in the application. It takes the `store` object
  created by `configureStore` as a prop and wraps the `App` component with it. This makes it
  possible for all components in the `App` to access the Redux store and dispatch actions to update
  the state. */
  <Provider store={store}>
    <App />
  </Provider>
);