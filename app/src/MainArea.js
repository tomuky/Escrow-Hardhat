import classes from './style/main.module.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from './App';
import { useContext } from 'react';

const MainArea = () => {
    const {account,connectWallet,rightNetwork} = useContext(StoreContext);
    const navigate = useNavigate();

    const checkBeforeNavigate = target => {
        if(!account) connectWallet();
        if(!rightNetwork) return;
        else navigate(target);
    }

  return (
    <div className={classes.main_area}>
      <div className={classes.box} onClick={()=>checkBeforeNavigate('/new')}>
        <span>Create Contract</span>
        <img src={require('./images/plus-icon.png')} alt='plus sign'/>
      </div>
      <div className={classes.box} onClick={()=>checkBeforeNavigate(`/account/${account}`)}>
        <span>Account Dashboard</span>
        <img src={require('./images/account-icon.png')} alt='plus sign'/>
      </div>
    </div>
  );
}

export default MainArea;