import classes from './style/newEscrow.module.css';

const FormButton = (props) => {

    const loadingElement = <img src={require('./images/loading.gif')} className={classes.loading_gif} alt='loading gif'/>;

    return (
        <div
            className={props.loading?classes.contract_button_loading:classes.contract_button}
            id={props.id}
            onClick={(e) => {
                e.preventDefault();
                props.newContract();
            }}
        >
            {props.loading?loadingElement:props.title}
        </div>
    )
}

export default FormButton;