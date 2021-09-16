import { useState, useRef } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import From from './From'
import To from './To'
import MainButton from './MainButton'
import Quote from './Quote'
import InfoBox from './InfoBox'
import IERC20 from '../abis/IERC20.json'
import uniswap_router2_abi from '../abis/uniswap_router2_abi.json'

const uniswapRouter = uniswap_router2_abi;

  const customBorderProps = {
      border: 2.5,
      borderRadius: 10,
      borderColor: '#91D5FF',
      style: {width: '465px', height: '130px',}
  }

  const customProps = {
    display: 'flex',
    flexGrow: 0,
    bgcolor: '#E6F7FF',
    borderRadius: '10px',
    boxShadow : 8,
    m: 1,
    style: { width: '496px', height: '395px' },
  }

const MainCard = ({ userBalance, userAddress, signer }) => {


    const [token, setToken] = useState();
    const [tokenBal, setTokenBal] = useState('ETH');
    const [inputAmount, setInputAmount] = useState('0');
    const [toToken, setToToken] = useState('');
    const [confirmSwap, setConfirmSwap] = useState(0);
    const[quote, setQuote] = useState('');
    const [title, setTitle] = useState('Swap');
    const confirmRef = useRef(0);


    const uiRender = (val) => {
        switch(val){
            case 0:
                customProps.flexGrow = 0;
                return ;
            case 1:
                customProps.flexGrow = 0.4;
                return <InfoBox quote={quote}/>
            case 2:
                return <InfoBox quote={quote}/>
            default:
                customProps.flexGrow = 0;

        }
    }

    return (
        <Box {...customProps} >
        {console.log('confirmSwap', confirmSwap)}
        <Grid container style={{flexGrow: 1}}>
            <Grid item xs={12}>
            <Typography variant="h6"
            style={{paddingLeft:20, paddingTop:10}}>
            {title}
            </Typography>
            </Grid>
            <Grid item xs={12}
            style={{paddingLeft:10, paddingRight:10, paddingBottom: 10}}>
                <Box {...customBorderProps}>
                     <From
                        IERC20={IERC20}
                        userBalance={userBalance}
                        userAddress={userAddress}
                        token={token}
                        setToken={setToken}
                        tokenBal={tokenBal}
                        setTokenBal={setTokenBal}
                        setInputAmount={setInputAmount}
                     />
                </Box>
            </Grid>
            <Grid item xs={12}
            style={{paddingLeft:10, paddingRight:10}}>
                <Box {...customBorderProps} >
                     <To
                        uniswapRouter={uniswapRouter}
                        token={token}
                        tokenBal={tokenBal}
                        inputAmount={inputAmount}
                        toToken={toToken}
                        setToToken={setToToken}
                        quote={quote}
                        setQuote={setQuote}
                     />
                </Box>
            </Grid>
            <Grid item xs={12} style={{paddingLeft:10, paddingRight:10}}>
                <Quote token={token} toToken={toToken} uniswapRouter={uniswapRouter}/>
            </Grid>
            <Grid item xs={12}
            style={{paddingLeft:10, paddingRight:10}}>
                {uiRender(confirmSwap)}
            </Grid>
            <Grid item xs={12}
            style={{paddingLeft:10, paddingRight:10, paddingBottom:12}}>
                <MainButton
                confirmSwap={confirmSwap}
                setConfirmSwap={setConfirmSwap}
                uniswapRouter={uniswapRouter}
                IERC20={IERC20}
                token={token}
                toToken={toToken}
                inputAmount={inputAmount}
                signer={signer}
                userAddress={userAddress}
                confirmRef={confirmRef}
                setTitle={setTitle}
                />
            </Grid>
        </Grid>
    </Box>
    )
}

export default MainCard