import { ethers } from "ethers";
import axios from 'axios';
import { useRouteLoaderData } from "react-router-dom";
import classes from './style/escrow.module.css';
import Escrow from './artifacts/contracts/Escrow.sol/Escrow';
import { useContext, useEffect, useMemo, useState } from "react";
import { StoreContext } from './App';

const EscrowDetail = () => {

    const data = useRouteLoaderData('escrowDetail');
    const {signer} = useContext(StoreContext);
    const [isApproved,setIsApproved] = useState(false);

    const contract = useMemo(()=>new ethers.Contract(data.address, Escrow.abi, signer),[data,signer]);
    
    const handleApprove = async () => {
        const tx = await contract.approve();
        console.log(tx)
    }

    useEffect(()=>{
        const getStatus = async () => {
            const contract = await new ethers.Contract(data.address, Escrow.abi, signer);
            const status = await contract.isApproved();
            setIsApproved(status);
            console.log('status',status)
        }
        getStatus();
    },[data.address,signer])

    console.log(data)

    return (
        <div className={classes.contract_area}>
            <div className={classes.contract_row}>
                {`Arbiter: ${data.arbiter||'loading...'}`}
            </div>
            <div className={classes.contract_row}>
                {`Beneficiary: ${data.beneficiary||'loading...'}`}
            </div>
            <div className={classes.contract_row}>
                {`Value: ${data.value||'loading...'} ETH`}
            </div>
            <div className={`${isApproved?classes.contract_button_approved:classes.contract_button}`} onClick={()=>handleApprove()}>
                {isApproved?'Already Approved ✔':"Send Approval"}
            </div>
        
            {/* <div className="button" id={props.address} onClick={(e)=>handleClick(e)}>
                Approve
            </div> */}
        
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
            type: response.data[key].value.type
        }
        return newState;

    }else{
        return {};
    }
}