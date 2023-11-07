import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { createContext } from 'react';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export const StoreContext = createContext();

const provider = new ethers.providers.Web3Provider(window.ethereum);

const App = () => {

    const [account, setAccount] = useState('');
    const [signer, setSigner] = useState();
    const [balanceETH, setBalanceETH] = useState(0);
    const [rightNetwork,setRightNetwork] = useState(true);

    const connectWallet = async() => {
        const { chainId } = await provider.getNetwork();
        if(chainId!==5) setRightNetwork(false);

        const accounts = await provider.send('eth_requestAccounts', []);
        const balance = await provider.getBalance(accounts[0]);

        setAccount(accounts[0]);
        setBalanceETH(ethers.utils.formatEther(balance))
        setSigner(provider.getSigner());
    }

    useEffect(() => {
        const thisConnect = async() => {
            const network = await provider.getNetwork();
            if(network.chainId!==5) setRightNetwork(false);

            const accounts = await provider.send('eth_requestAccounts', []);
            const balance = await provider.getBalance(accounts[0]);

            setAccount(accounts[0]);
            setBalanceETH(ethers.utils.formatEther(balance))
            setSigner(provider.getSigner());
        }
        thisConnect();
    }, []);

    return (
        <StoreContext.Provider 
            value={{
                account, setAccount,
                balanceETH, setBalanceETH,
                signer, setSigner,
                connectWallet,
                provider,
                rightNetwork
            }}
        >
            <RouterProvider router={router}/>
        </StoreContext.Provider>
    )
}

export default App;