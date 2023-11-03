import { useContext } from 'react';
import EscrowForm from './EscrowForm';
import ExistingContracts from './ExistingContracts';
import { StoreContext } from './App';

const MainArea = () => {

  const {signer,escrows,setEscrows} = useContext(StoreContext);

  return (
    <>
      <EscrowForm 
        signer={signer}
        escrows={escrows}
        setEscrows={setEscrows}
      />

      <ExistingContracts 
        escrows={escrows}
      />
    </>
  );
}

export default MainArea;