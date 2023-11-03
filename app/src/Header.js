import { useContext } from 'react';
import classes from './Header.module.css';
import { StoreContext } from './App';

const Header = () => {
    const {account} = useContext(StoreContext);
    console.log(account)

    const displayAccount = `${account.substring(0,5)}...${account.substring(account.length-3,account.length)}`;
    return (
        <div className={classes.header_area}>
            <span className={classes.title}>Escrow Contract</span>
            <span className={classes.wallet}>{account?displayAccount:'Connect Wallet'}</span>
        </div>
    )
}

export default Header;