import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Charts from './pages/Charts.jsx';
import Goal from './pages/Goal.jsx';
import { store } from './store/store.js';
import Download from './pages/Download.jsx';
import Layout from './components/Layout.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <App/>
      },
      {
    path: '/analytics',
    element: <Charts />,
  },
  {
    path: '/goal',
    element: <Goal />,
  },
  {
    path: '/download',
    element: <Download/>
  }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
