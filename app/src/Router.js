import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import MainArea from './MainArea';
import EscrowDetail, { loaderDetail } from './EscrowDetail';
import Account, { loaderAccount } from './Account';
import NewContract from './NewContract';
  
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
                path: 'new',
                element: <NewContract/>
            },
            { 
                path: 'escrow/:address', 
                element: <EscrowDetail/>,
                loader: loaderDetail,
                id: 'escrowDetail'
            },
            {
                path: 'account/:address',
                element: <Account/>,
                loader: loaderAccount,
                id: 'account'
            }
        ]
    }
])

export default router;