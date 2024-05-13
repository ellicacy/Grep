import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ContextProvider } from './contexts/ContextProvider'
import './index.css'
import router from './router';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import "inter-ui/inter.css";
import theme from './theme'
import { Provider } from 'react-redux'
import {persistor, store} from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import Loader from './views/Loader'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme} >
      <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
          <ContextProvider>
            <RouterProvider router={router} />
          </ContextProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
