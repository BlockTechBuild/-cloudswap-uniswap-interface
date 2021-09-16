import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import ToSelect from './ToSelect'

const To = ({ uniswapRouter, tokenBal, token, inputAmount,
toToken, setToToken, quote, setQuote }) => {

    return (
    <Grid container style={{paddingLeft: 10, paddingRight: 10}}>
        <Grid item xs={12}>
            <Box mt={1.5}>
            <Typography >TO</Typography>
            </Box>
        </Grid>
        <Grid item xs={6}>
            <ToSelect
                uniswapRouter={uniswapRouter}
                setQuote={setQuote}
                tokenBal={tokenBal}
                token={token}
                inputAmount={inputAmount}
                toToken={toToken}
                setToToken={setToToken}
                quote={quote}
                />
        </Grid>
        <Grid item xs={6}>
            <Box mt={4.5}>
            <Typography variant="h6"align={'right'}>{quote}</Typography>
            </Box>
        </Grid>
    </Grid>
    )
}

export default To