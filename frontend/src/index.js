import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Thread from './views/Thread';
import Threads from './views/Threads';
import FavThreadsProvider from './context/FavThreadsProvider';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Threads />
  },
  {
    path: '/thread/:id',
    element: <Thread />
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FavThreadsProvider>
      <RouterProvider router={router} />
    </FavThreadsProvider>
  </React.StrictMode>
);
