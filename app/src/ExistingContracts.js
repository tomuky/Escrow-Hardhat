import Escrow from './Escrow';
import { useContext } from 'react';
import { StoreContext } from './App';

const ExistingContracts = () => {

    const {escrows} = useContext(StoreContext);

    return (
        <div className="existing-contracts">
            <h1> Existing Contracts </h1>
            <div id="container">
                {escrows.map((escrow) => <Escrow key={escrow.address} {...escrow} /> )}
            </div>
        </div>
    )
}

export default ExistingContracts;