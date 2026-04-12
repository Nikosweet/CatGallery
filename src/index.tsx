
import {createRoot} from 'react-dom/client'
import App from './components/App'

import { Children } from 'react';
import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from '@/states/store'

import './index.css'
import './fonts.css'

import {Cats} from "@/pages/Cats";
import {Lovely} from '@/pages/Lovely'

const root = document.getElementById('root')

if (!root) {
    throw new Error('root not found');
}

const container = createRoot(root);

const router = createHashRouter([
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
            },
            {
                path: 'lovely',
                element: <Lovely />
            }
        ]
    }
])

container.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);