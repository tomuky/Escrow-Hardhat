import { ethers } from 'ethers';
import deploy from './deploy';
import FormLabel from './FormLabel';
import FormButton from './FormButton';

const EscrowForm = ({signer,escrows,setEscrows}) => {

    const approve = async (escrowContract, signer) => {
        const approveTxn = await escrowContract.connect(signer).approve();
        await approveTxn.wait();
    }

    const newContract = async () => {
        const beneficiary = document.getElementById('beneficiary').value;
        const arbiter = document.getElementById('arbiter').value;
        const value = ethers.utils.parseEther(document.getElementById('eth').value);
        const escrowContract = await deploy(signer, arbiter, beneficiary, value);
    
        const escrow = {
            address: escrowContract.address,
            arbiter,
            beneficiary,
            value: value.toString(),
            handleApprove: async () => {
                escrowContract.on('Approved', () => {
                    document.getElementById(escrowContract.address).className = 'complete';
                    document.getElementById(escrowContract.address).innerText = "✓ It's been approved!";
                });
                await approve(escrowContract, signer);
            },
        };
    
        setEscrows([...escrows, escrow]);
    }

    return (
        <div className="contract">
            <h1> New Contract </h1>
            <FormLabel title="Arbiter Address" id="arbiter"/>
            <FormLabel title="Beneficiary Address" id="beneficiary"/>
            <FormLabel title="Deposit Amount (in ETH)" id="eth"/>
            <FormButton title="Deploy" id="deploy" newContract={newContract}/>
        </div>
    )
}

export default EscrowForm;