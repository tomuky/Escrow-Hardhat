import { useNavigate, useParams } from 'react-router-dom';
import classes from './style/account.module.css';
import axios from 'axios';
import { useRouteLoaderData } from "react-router-dom";
import { FormatAddress, FormatTimestamp } from './Utilities';

const Account = () => {

    const {address:account} = useParams();
    const data = useRouteLoaderData('account');
    const navigate = useNavigate();

    return (
        <div className={classes.account_area}>
            <div className={classes.account_toprow}>
                <span style={{fontWeight:'bold'}}>Account: </span>
                <span>{FormatAddress(account)}</span>
            </div>
            <div className={classes.account_section}>
                <div className={classes.account_section_title}>
                    Arbiter Contracts:
                </div>
                { data.arbiter.length<1 && <>No contracts  yet</>}
                { data.arbiter.length>0 && 
                    <div className={classes.account_section_list_area}>
                        { data.arbiter.map((d,i)=> (
                            <div className={classes.list_item} key={`e_a_${i}`} onClick={()=>navigate(`/escrow/${d.address}`)}>
                                <div className={classes.list_item_timestamp}>{FormatTimestamp(d.timestamp)}</div>
                                <div className={classes.list_item_value}>{FormatAddress(d.address)}</div>
                            </div>
                        )) }
                    </div>
                }
            </div>
            <div className={classes.account_section}>
                <div className={classes.account_section_title}>
                    Beneficiary Contracts:
                </div>
                { data.beneficiary.length<1 && <>No contracts  yet</>}
                { data.beneficiary.length>0 && 
                    <div className={classes.account_section_list_area}>
                        { data.beneficiary.map((d,i)=> (
                            <div className={classes.list_item} key={`e_a_${i}`} onClick={()=>navigate(`/escrow/${d.address}`)}>
                                <div className={classes.list_item_timestamp}>{FormatTimestamp(d.timestamp)}</div>
                                <div className={classes.list_item_value}>{FormatAddress(d.address)}</div>
                            </div>
                        )) }
                    </div>
                }
            </div>
        </div>
    )
}

export default Account;

export const loaderAccount = async ({params}) => {

    const response = await axios.get(`${process.env.REACT_APP_FIREBASE_URL}/escrows.json`);
    
    if(response.status===200){
        let arbiter = [];
        let beneficiary = [];
        Object.keys(response.data).forEach((d,i)=>{ 

            if(response.data[d][Object.keys(response.data[d])[0]].arbiter.toUpperCase() ===  params.address.toUpperCase()){
                const obj = {
                    timestamp: response.data[d][Object.keys(response.data[d])[0]].timestamp,
                    address: response.data[d][Object.keys(response.data[d])[0]].address
                }
                arbiter.push(obj);
            }
            if(response.data[d][Object.keys(response.data[d])[0]].beneficiary.toUpperCase() ===  params.address.toUpperCase()){
                const obj = {
                    timestamp: response.data[d][Object.keys(response.data[d])[0]].timestamp,
                    address: response.data[d][Object.keys(response.data[d])[0]].address
                }
                beneficiary.push(obj);
            }
        })
        return {
            arbiter, 
            beneficiary
        }
    }
    return {};
} 