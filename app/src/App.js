import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { createContext } from 'react';import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export const StoreContext = createContext();

const provider = new ethers.providers.Web3Provider(window.ethereum);

const App = () => {

    const [account, setAccount] = useState('');
    const [signer, setSigner] = useState();
    const [balanceETH, setBalanceETH] = useState(0);

    useEffect(() => {
        async function getAccounts() {
            const accounts = await provider.send('eth_requestAccounts', []);
            const balance = await provider.getBalance(accounts[0]);

            setAccount(accounts[0]);
            setBalanceETH(ethers.utils.formatEther(balance))
            setSigner(provider.getSigner());
        }
        getAccounts();
    }, []);

    return (
        <StoreContext.Provider 
            value={{
                account, setAccount,
                balanceETH,
                signer
            }}
        >
            <RouterProvider router={router}/>
        </StoreContext.Provider>
    )
}

export default App;

// 0x64b2e5795Ff48EbA73aA5fD2b3d0331A79E02627
// 0xab6A2ea1f9AECf1b5B93570cDD9b6d5c3017c325
// 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// 0x90F79bf6EB2c4f870365E785982E1f101E93b906