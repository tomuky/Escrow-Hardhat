import { ethers } from "ethers";
import axios from 'axios';
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import classes from './style/escrow.module.css';
import Escrow from './artifacts/contracts/Escrow.sol/Escrow';
import { useContext, useEffect, useMemo, useState } from "react";
import { StoreContext } from './App';
import { FormatAddress,FormatTimestamp } from "./Utilities";

const EscrowDetail = () => {

    const params = useParams();
    const data = useRouteLoaderData('escrowDetail');
    const navigate = useNavigate();
    const {signer,account,provider} = useContext(StoreContext);
    const [isApproved,setIsApproved] = useState(false);
    const [isApprovable,setIsApprovable] = useState(false);
    const [loading,setLoading] = useState(false);

    const [deployTxHash,setDeployTxHash] = useState();
    const [message,setMessage] = useState();
    const [status,setStatus] = useState();

    const contract = useMemo(()=>new ethers.Contract(data.address, Escrow.abi, signer),[data,signer]);
    
    const handleApprove = async () => {
        setStatus('Sending transaction...');
        setLoading(true);
        const tx = await contract.approve();
        setDeployTxHash(tx.hash);

        setStatus('Waiting on network to confirm transaction...');
        const waitingTx = await provider.waitForTransaction(tx.hash);
        setStatus('Confirmed ✔');

        if(waitingTx.status===1){
            setIsApproved(true);
        }else{
            setMessage('Something went wrong');
        }
        setLoading(false);
    }

    useEffect(()=>{
        const getStatus = async () => {
            const status = await contract.isApproved();
            setIsApproved(status);
            //console.log('status',status)
        }
        getStatus();
    },[data.address,contract,signer])

    useEffect(()=>{
        if(account.toLowerCase() === data.arbiter.toLowerCase()) setIsApprovable(true);
    },[account,data.arbiter]);

    const loadingElement = <img src={require('./images/loading.gif')} className={classes.loading_gif} alt='loading gif'/>;

    return (
        <div className={classes.contract_area}>
            <a className={classes.contract_row_clickable} target="_blank" rel="noreferrer" href={`https://goerli.etherscan.io/address/${data.address}`}>
                {`Escrow Contract: ${FormatAddress(params.address)||'loading...'}`}
                <img src={require('./images/external-link-icon.png')} alt='external link icon'/>
            </a>
            <div className={classes.contract_row}>
                {`Timestamp: ${FormatTimestamp(data.timestamp)||'loading...'}`}
            </div>
            <div className={classes.contract_row}>
                Approval Status: {
                    isApproved?
                    <span className={classes.yes_pill}>Yes</span>:
                    <span className={classes.no_pill}>Not yet</span>
                }
            </div>
            <div className={classes.contract_row_clickable} onClick={()=>navigate(`/account/${data.arbiter}`)}>
                {`Arbiter: ${FormatAddress(data.arbiter)||'loading...'}`}
            </div>
            <div className={classes.contract_row_clickable} onClick={()=>navigate(`/account/${data.beneficiary}`)}>
                {`Beneficiary: ${FormatAddress(data.beneficiary)||'loading...'}`}
            </div>
            <div className={classes.contract_row}>
                {`Value: ${data.value||'loading...'} ETH`}
            </div>

            { (isApprovable && !loading) && 
                <div className={isApproved?classes.contract_button_approved:classes.contract_button} onClick={()=>handleApprove()}>
                    {isApproved?'Approved ✔':"Send Approval"}
                </div>
            }
            { (loading) && 
                <div className={classes.contract_button_loading}>
                    {loadingElement}
                </div>
            }

                { status && <div className={classes.form_status}>{status}</div> }
                { message && <div className={classes.form_message}>{message}</div> }
                { deployTxHash && <a className={classes.form_deploy_tx} href={`https://goerli.etherscan.io/tx/${deployTxHash}`} target='_blank' rel="noreferrer" >See transaction ➚</a> }
        </div>
    );
}

export default EscrowDetail;

export const loaderDetail = async ({params}) => {
    
    const response = await axios.get(`${process.env.REACT_APP_FIREBASE_URL}/escrows/${params.address}.json`);
    
    if(response.status===200){
        const key = Object.keys(response.data)[0];

        const newState = {
            address: response.data[key].address,
            arbiter: response.data[key].arbiter,
            beneficiary: response.data[key].beneficiary,
            hex: response.data[key].value.hex,
            value: ethers.utils.formatEther(response.data[key].value.hex),
            type: response.data[key].value.type,
            timestamp: response.data[key].timestamp
        }
        return newState;

    }else{
        return {};
    }
}