import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = {
    root: {
      background : "#E6F7FF",
      borderRadius: 3,
      width: 112,
      height: 40,
      "&:hover": {
        background: "#E6F7FF"
      }
    }
  };

  const useStyles = makeStyles(styles);

  export const SwapButton = ({ setSwitchUI, switchUI }) => {

    const classes = useStyles();

    return (
    <div>
      {switchUI ? <Button onClick={() => setSwitchUI(false)}> Swap </Button>
      : <Button className={classes.root}> Swap </Button>}
      </div>
      )
  };

export default SwapButton