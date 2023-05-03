import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
const App = React.lazy(() => import('./App'))
import './sass/index.scss'
import { persistor, store } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<div>..</div>}>
          <App />
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
