import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import EscrowForm from './EscrowForm';
import ExistingContracts from './ExistingContracts';

const provider = new ethers.providers.Web3Provider(window.ethereum);

const MainArea = () => {

  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }
    getAccounts();
  }, [account]);

  return (
    <>
      <EscrowForm 
        signer={signer}
        escrows={escrows}
        setEscrows={setEscrows}
      />

      <ExistingContracts escrows={escrows}/>
    </>
  );
}

export default MainArea;