import { useContext, useState } from 'react';
import { StoreContext } from './App';
import { ethers } from 'ethers';
import deploy from './deploy';
import FormInput from './FormInput';
import FormButton from './FormButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import classes from './style/newEscrow.module.css';

const EscrowForm = () => {
    
    const navigate = useNavigate();
    const {signer} = useContext(StoreContext);
    const [loading,setLoading] = useState(false);

    const getTimestamp = () => {
        return new Date();
    }

    const newContract = async () => {
        setLoading(true);
        const beneficiary = document.getElementById('beneficiary').value;
        const arbiter = document.getElementById('arbiter').value;
        const value = ethers.utils.parseEther(document.getElementById('eth').value);
        try{
            const escrowContract = await deploy(signer, arbiter, beneficiary, value);
            console.log(escrowContract);
            debugger
            const address = escrowContract.address;
            const thisEscrow = {
                beneficiary, arbiter, value, address, timestamp: getTimestamp()
            }

            const saveURL = `${process.env.REACT_APP_FIREBASE_URL}/escrows/${address}.json`;
            const saveEscrowResponse = await axios.post(saveURL,thisEscrow);
            if(saveEscrowResponse.status===200){
                navigate(`/escrow/${address}`);
            }
        }catch(err){
            console.error(err);
            setLoading(false)
        }

        setLoading(false)
        return;
    }

    return (
        <div className={classes.form_area}>
            <div className={classes.form_title}>New Contract</div>
            <form className={classes.new_contract_form}>
                <FormInput title="Arbiter Address" id="arbiter"/>
                <FormInput title="Beneficiary Address" id="beneficiary"/>
                <FormInput title="Deposit Amount (in ETH)" id="eth"/>
                <FormButton title="Deploy" id="deploy" newContract={newContract} loading={loading}/>
            </form>
        </div>
    )
}

export default EscrowForm;