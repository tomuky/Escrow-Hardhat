import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div style={{'height': '100%'}}>
            <Outlet/>
        </div>
    );
}

export default Layout;