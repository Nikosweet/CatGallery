
import {createRoot} from 'react-dom/client'
import App from './components/App'

import { Children } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from '@/states/store'

import './index.css'
import './fonts.css'

import {Cats} from "@/pages/Cats";


const root = document.getElementById('root')

if (!root) {
    throw new Error('root not found');
}

const container = createRoot(root);

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to='/cats' replace/>
            },
            {
                path: 'cats',
                element: <Cats />
            }
        ]
    }
])

container.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);