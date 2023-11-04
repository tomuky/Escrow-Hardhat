import { useContext } from 'react';
import classes from './Header.module.css';
import { StoreContext } from './App';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const {account} = useContext(StoreContext);
    const navigate = useNavigate();

    let displayAccount = 'Connect Wallet';
    if(account) displayAccount = `${account.substring(0,5)}...${account.substring(account.length-3,account.length)}`;

    return (
        <div className={classes.header_area}>
            <span className={classes.title} onClick={()=>navigate('/')}>Escrow Contract</span>
            <span className={classes.wallet}>{displayAccount}</span>
        </div>
    )
}

export default Header;