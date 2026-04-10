import {createRoot} from 'react-dom/client'
import App from './components/App'
import { Children } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/states/store'
import './index.css'
import './fonts.css'

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

        ]
    }
])

container.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);