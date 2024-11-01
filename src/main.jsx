import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Statistics from './pages/Statistics';
import Saved from './pages/Saved';
import Profile from './pages/Profile';
import Layout from './component/Layout';
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "Statistics",
        element: <Statistics />,
      },
      {
        path: "Saved",
        element: <Saved />,
      },
      {
        path: "Profile",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
<RouterProvider router={router} />
  </StrictMode>,
)
