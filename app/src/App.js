import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

const App = () => {
    return <RouterProvider router={router}/>;
}

export default App;

// 0x64b2e5795Ff48EbA73aA5fD2b3d0331A79E02627
// 0xab6A2ea1f9AECf1b5B93570cDD9b6d5c3017c325
// 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// 0x90F79bf6EB2c4f870365E785982E1f101E93b906