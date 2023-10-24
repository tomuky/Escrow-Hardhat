import Escrow from './Escrow';

const ExistingContracts = (props) => {
    return (
        <div className="existing-contracts">
            <h1> Existing Contracts </h1>
            <div id="container">
            {props.escrows.map((escrow) => {
                return <Escrow key={escrow.address} {...escrow} />;
            })}
            </div>
        </div>
    )
}

export default ExistingContracts;