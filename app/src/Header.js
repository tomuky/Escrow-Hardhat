import { useContext } from 'react';
import classes from './style/header.module.css';
import { StoreContext } from './App';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const {account, balanceETH} = useContext(StoreContext);
    const navigate = useNavigate();

    let displayAccount = 'Connect Wallet';
    if(account) displayAccount = `${account.substring(0,5)}...${account.substring(account.length-3,account.length)}`;

    return (
        <div className={classes.header_area}>
            <div className={classes.logo} onClick={()=>navigate('/')}>
                <img src={require('./images/escrow-logo.png')} alt='logo'/>
                <span className={classes.title}>Escrow</span>
            </div>
            <div className={classes.wallet_area}>
                <span className={classes.eth_balance_area}>{`${Math.round(balanceETH*1000)/1000} ETH`}</span>
                <span className={classes.wallet} onClick={()=>navigate(`/account/${account}`)}>{displayAccount}</span>
            </div>
        </div>
    )
}

export default Header;