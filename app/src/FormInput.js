import { FormatAddress } from './Utilities';
import classes from './style/newEscrow.module.css';

const FormInput = (props) => {
    return (
        <div className={classes.input_group}>
            <label>
                <span>{props.title}</span>
                {props.disabled && <input type="text" id={props.id} disabled value={FormatAddress(props.value)}/>}
                {!props.disabled && <input type="text" id={props.id} value={FormatAddress(props.value)}/>}
            </label>
        </div>
    )
}

export default FormInput;