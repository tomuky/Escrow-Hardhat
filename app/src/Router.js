import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import MainArea from './MainArea';
import EscrowDetail, { loaderDetail } from './EscrowDetail';
  
const router = createBrowserRouter([
    { 
        path: '/', 
        element: <Layout/>,
        errorElement: <>error</>,
        children: [
            { 
                index: true, 
                element: <MainArea/> 
            },
            { 
                path: 'escrow/:address', 
                element: <EscrowDetail/>,
                loader: loaderDetail,
                id: 'escrowDetail'
            },
        ]
    }
])

export default router;