import { withStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const customBorderProps = {
    border: 2,
    borderRadius: 10,
    borderColor: '#91D5FF',
    style: {height: '114px',}
}

const InfoText= withStyles({
    root: {
      fontSize: '0.85rem',
      fontWeight : 500,
      paddingLeft: 10,
      paddingRight: 10,
    }
  })(Typography);



const InfoBox = ({ quote }) => {
    return (
        <div>
        <Box display="flex" bgcolor="primary.main" {...customBorderProps}>
        <Grid Grid container spacing="0.9"
        style={{flexGrow: 1}}>
            <Grid item xs={6}>
                <InfoText>
                    Liquidty Provider Fee
                </InfoText>
            </Grid>
            <Grid item xs={6}>
                <InfoText align="right">
                        0.003 ETH
                </InfoText>
            </Grid>
            <Grid item xs={6}>
                <InfoText>
                    Route
                </InfoText>
            </Grid>
            <Grid item xs={6}>
                <InfoText align="right">
                    ETH -> USDC
                </InfoText>
            </Grid>
            <Grid item xs={6}>
                <InfoText>
                    Price Impact
                </InfoText>
            </Grid>
            <Grid item xs={6} align="right">
                <InfoText>
                    -0.004%
                </InfoText>
            </Grid>
            <Grid item xs={6}>
                <InfoText>
                    Minimum Recieved
                </InfoText>
            </Grid>
            <Grid item xs={6} align="right">
                <InfoText>
                {quote}
                </InfoText>
            </Grid>
            <Grid item xs={6}>
                <InfoText>
                    Slippage Tolerance
                </InfoText>
            </Grid>
            <Grid item xs={6} align="right">
                <InfoText>
                0.50%
                </InfoText>
            </Grid>
           </Grid>
        </Box>
        </div>
    )
}

export default InfoBox