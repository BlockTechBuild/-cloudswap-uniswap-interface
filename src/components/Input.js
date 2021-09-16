import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '22ch',
      },
    },
  }));

const Input = ({ setInputAmount }) => {
    const classes = useStyles();

    const handleTextFieldChange = (event) => {
        setInputAmount(event.target.value)
    }
    return (
        <form  className={classes.root} noValidate autoComplete="off">
         <TextField onChange={handleTextFieldChange} id="outlined-basic" label="amount" variant="outlined" />
        </form>
    )
}

export default Input