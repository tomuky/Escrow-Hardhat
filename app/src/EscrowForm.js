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
    const {provider,signer,balanceETH,account} = useContext(StoreContext);
    const [loading,setLoading] = useState(false);
    const [deployTxHash,setDeployTxHash] = useState();
    const [message,setMessage] = useState();
    const [status,setStatus] = useState();

    const newContract = async () => {
        setLoading(true);
        const beneficiary = document.getElementById('beneficiary').value;
        const arbiter = document.getElementById('arbiter').value;
        const value = ethers.utils.parseEther(document.getElementById('eth').value);

        if(balanceETH < document.getElementById('eth').value){
            setLoading(false);
            setMessage(`You don't have eough ETH`);
            return;
        }

        try{
            setStatus('Sending transaction...');
            const escrowContract = await deploy(signer, arbiter, beneficiary, value);
            setDeployTxHash(escrowContract.deployTransaction.hash);

            setStatus('Waiting on network to confirm transaction...');
            const waitingTx = await provider.waitForTransaction(escrowContract.deployTransaction.hash);
            setStatus('Confirmed ✔');

            if(waitingTx.status!==1){
                setMessage('Something went wrong');
                setLoading(false);
                console.log(waitingTx);
                return;
            }

            const address = escrowContract.address;
            const thisEscrow = {
                beneficiary, arbiter, value, address, timestamp: new Date()
            }

            const saveURL = `${process.env.REACT_APP_FIREBASE_URL}/escrows/${address}.json`;
            const saveEscrowResponse = await axios.post(saveURL,thisEscrow);
            if(saveEscrowResponse.status===200){
                setLoading(false)
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
                <FormInput title="Payer Address" id="payer" disabled="disabled" value={account}/>
                <FormInput title="Beneficiary Address" id="beneficiary"/>
                <FormInput title="Arbiter Address" id="arbiter"/>
                <FormInput title="Deposit Amount (in ETH)" id="eth"/>
                <FormButton title="Deploy" id="deploy" newContract={newContract} loading={loading}/>

                { status && <div className={classes.form_status}>{status}</div> }
                { message && <div className={classes.form_message}>{message}</div> }
                { deployTxHash && <a className={classes.form_deploy_tx} href={`https://goerli.etherscan.io/tx/${deployTxHash}`} target='_blank' rel="noreferrer" >See transaction ➚</a> }
            </form>
        </div>
    )
}

export default EscrowForm;