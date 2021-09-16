import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

const customProps = {
    bgcolor: '#0ED4FF',
    borderColor: '#E6F7FF',
    borderRadius: '10px',
    m: 1,
    border: 0,
    style: { width: '80px', height: '30px' }
  }

const WalletStatus = ({ userBalance, userAddress }) => {

    const activeWallet = () => {
        return (
            <Grid container >
                <Grid item xs={6} align="left" >
                    <Box {...customProps} flexDirection="row" pl={0.5} pt={0.2}>
                    {userBalance} ETH
                    </Box>
                </Grid>
                <Grid item xs={6} align="right">
                    <Box style={{width: '100px', height: '12px' }}>
                    </Box>
                    {userAddress}
                </Grid>
            </Grid>
        )
    }

    return (
        <div>
        {userBalance ? activeWallet() : <div>Connect Wallet</div>}
        </div>
    )
}

export default WalletStatus