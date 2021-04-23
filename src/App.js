import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import AppRouter from './app-router/AppRouter';
import store from './app-state/store';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'moment/locale/de';

function App() {
  return (
    <Provider store={store}>
      <>
        <Suspense fallback="Loading...">
          <AppRouter />
        </Suspense>
        <ToastContainer />
      </>
    </Provider>
  );
}

export default App;
