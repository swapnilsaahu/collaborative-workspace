import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage.tsx'
import WhiteBoardPage from './pages/WhiteboardPage.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/dashboard',
        element:
            (
                <DashboardPage />
            )
    },
    {
        path: '/whiteboardpage/:roomId',
        element: (
            < WhiteBoardPage />
        )
    }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
