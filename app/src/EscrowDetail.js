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
    const {signer,account} = useContext(StoreContext);
    const [isApproved,setIsApproved] = useState(false);
    const [isApprovable,setIsApprovable] = useState(false);

    const contract = useMemo(()=>new ethers.Contract(data.address, Escrow.abi, signer),[data,signer]);
    
    const handleApprove = async () => {
        const tx = await contract.approve();
        console.log(tx)
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

    return (
        <div className={classes.contract_area}>
            <a className={classes.contract_row_clickable} target="_blank" href={`https://goerli.etherscan.io/address/${data.address}`}>
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

            { isApprovable && 
                <div className={`${isApproved?classes.contract_button_approved:classes.contract_button}`} onClick={()=>handleApprove()}>
                    {isApproved?'Already Approved ✔':"Send Approval"}
                </div>
            }
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