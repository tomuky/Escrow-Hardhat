import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import EscrowForm from './EscrowForm';
import ExistingContracts from './ExistingContracts';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

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
        approve={approve}
        setEscrows={setEscrows}
      />

      <ExistingContracts escrows={escrows}/>
    </>
  );
}

export default MainArea;