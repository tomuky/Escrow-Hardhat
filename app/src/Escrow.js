import { ethers } from "ethers";

const Escrow = (props) => {

  const handleClick = (e) => {
    e.preventDefault();
    props.handleApprove();
  }

  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> {props.arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> {props.beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> {ethers.utils.formatEther(props.value)} </div>
        </li>
        <div className="button" id={props.address} onClick={(e)=>handleClick(e)}>
          Approve
        </div>
      </ul>
    </div>
  );
}

export default Escrow;