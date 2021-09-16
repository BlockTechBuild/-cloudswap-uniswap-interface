import { Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import FromSelect from './FromSelect'
import Input from './Input'



const From = ({
    IERC20, userBalance, userAddress, tokenBal, setTokenBal, token, setToken,
setInputAmount }) => {

    return (
        <Grid container style={{paddingLeft: 10, paddingRight: 10}}>
        <Grid item xs={12}>
            <Box mt={1}>
            <Typography >FROM</Typography>
            </Box>
        </Grid>
        <Grid item xs={6}>
            <FromSelect
                token={token}
                setToken={setToken}
                tokenBal={tokenBal}
                setTokenBal={setTokenBal}
                IERC20={IERC20}
                userAddress={userAddress}
                />
        </Grid>
        <Grid item xs={6}>
            <Typography align={'right'}><Input setInputAmount={setInputAmount}/></Typography>
        </Grid>
        <Grid item xs={12}>
            <Box mb={1.5}>
            <Typography >
            Balanace:{tokenBal} {token}
            </Typography>
            </Box>
        </Grid>
    </Grid>
    )
}

export default From