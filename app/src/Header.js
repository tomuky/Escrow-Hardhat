import { useContext } from 'react';
import classes from './style/header.module.css';
import { StoreContext } from './App';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const {account, balanceETH, connectWallet, rightNetwork} = useContext(StoreContext);
    const navigate = useNavigate();

    const displayAccount = `${account.substring(0,5)}...${account.substring(account.length-3,account.length)}`;
console.log(rightNetwork)
    return (
        <div className={classes.header_area}>
            <div className={classes.logo} onClick={()=>navigate('/')}>
                <img src={require('./images/escrow-logo.png')} alt='logo'/>
                <span className={classes.title}>Escrow</span>
            </div>
            <div className={classes.wallet_area}>

                { rightNetwork && <span className={classes.eth_balance_area}>{`${Math.round(balanceETH*1000)/1000} ETH`}</span> }
                { !rightNetwork && <span className={classes.network_area}>Wrong network (Goerli only)</span>}

                { account && <span className={classes.wallet} onClick={()=>navigate(`/account/${account}`)}>{displayAccount}</span> }
                { !account && <span className={classes.wallet} onClick={()=>connectWallet()}>Connect Wallet</span> }
            </div>
        </div>
    )
}

export default Header;