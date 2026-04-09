import {createRoot} from 'react-dom/client'
import App from './components/App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Children } from 'react';
import { Shop } from './pages/shop';
import { About } from '@/pages/about';

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
                path: '/about',
                element: <About />
            },
            {
                path: '/shop',
                element: <Shop/>
            },
        ]
    }
])

container.render(
    <RouterProvider router={router} />
);