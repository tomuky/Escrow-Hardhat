import { useContext, useState } from 'react';
import { StoreContext } from './App';
import { ethers } from 'ethers';
import deploy from './deploy';
import FormLabel from './FormLabel';
import FormButton from './FormButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EscrowForm = () => {
    
    const navigate = useNavigate();
    const {signer} = useContext(StoreContext);
    const [loading,setLoading] = useState(false);

    // const approve = async (escrowContract, signer) => {
    //     const approveTxn = await escrowContract.connect(signer).approve();
    //     await approveTxn.wait();
    // }

    const newContract = async () => {
        setLoading(true);
        const beneficiary = document.getElementById('beneficiary').value;
        const arbiter = document.getElementById('arbiter').value;
        const value = ethers.utils.parseEther(document.getElementById('eth').value);

        const escrowContract = await deploy(signer, arbiter, beneficiary, value);
        
        const address = escrowContract.address;
        const thisEscrow = {
            beneficiary, arbiter, value, address
        }

        const saveURL = `${process.env.REACT_APP_FIREBASE_URL}/escrows/${address}.json`;
        const saveEscrowResponse = await axios.post(saveURL,thisEscrow);
        if(saveEscrowResponse.status===200){
            navigate(`/escrow/${address}`);
        }

        setLoading(false)
        return;
    }

    return (
        <div className="contract">
            <h1> New Contract </h1>
            <FormLabel title="Arbiter Address" id="arbiter"/>
            <FormLabel title="Beneficiary Address" id="beneficiary"/>
            <FormLabel title="Deposit Amount (in ETH)" id="eth"/>
            <FormButton title="Deploy" id="deploy" newContract={newContract} loading={loading}/>
        </div>
    )
}

export default EscrowForm;