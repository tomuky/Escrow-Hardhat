import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import MainArea from './MainArea';
  
const router = createBrowserRouter([
    { 
        path: '/', 
        element: <Layout/>,
        // errorElement: <ErrorPage/>,
        children: [
            { index: true, element: <MainArea/> },
            { path: 'address/:address', element: <>address</>},
        ]
    }
])

export default router;