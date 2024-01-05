import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'
import Thread from './views/Thread'
import Threads from './views/Threads'
import NoPage from './views/NoPage'
import React from 'react'

const routerMap = createBrowserRouter([
    {
        path: '/',
        element: <Threads />
    },
    {
        path: '/thread/:id',
        element: <Thread />
    },
    {
        path: '*',
        element: <NoPage />
    }
])

export default function Router() {
    return (
        <RouterProvider router={routerMap} />
    )
}
