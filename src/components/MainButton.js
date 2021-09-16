import { ethers } from 'ethers'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Tokens from '../addresses'

const uniswapAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'

const styles = {
    root: {
        color: 'white',
        background: '#69C0FF',
        borderRadius: 3,
        '&:hover': {
          background: '#0f96f7'
        },
      }
  };

  const useStyles = makeStyles(styles);

  export const MainButton = ({ confirmSwap, setConfirmSwap, uniswapRouter, IERC20,
    token, inputAmount, signer, toToken, userAddress, confirmRef, setTitle}) => {

    const classes = useStyles();

    const swap = () => {
      setConfirmSwap(1);
      confirmRef.current +=1;
      return <div>asdsdf</div>
   }

   const approve = async () => {
    if (typeof window.ethereum !== 'undefined'){
      setConfirmSwap(2);
      confirmRef.current +=1
      const address = Tokens[token];
      const contract = new ethers.Contract(address, IERC20, signer)
      const weiInputAmount = ethers.utils.parseUnits(inputAmount);
      await contract.approve(uniswapAddress, weiInputAmount._hex);

    }
  }

   const executeSwap = async () => {
    const weiInputAmount = ethers.utils.parseUnits(inputAmount)
    const baseAddress = Tokens[token];
    const outputAddress = Tokens[toToken];
    const contract = new ethers.Contract(uniswapAddress, uniswapRouter, signer)
    const deadline = new Date().getTime() + 1000;
    try {
        const amountsArray = await contract.getAmountsOut(weiInputAmount._hex, [baseAddress, outputAddress]);
        const amountOutMin = amountsArray[1];

        await contract.swapExactTokensForTokens(
          weiInputAmount._hex,
          amountOutMin._hex,
          [baseAddress, outputAddress],
          userAddress,
          deadline);
        confirmRef.current = 0;
        setConfirmSwap(0);
        }
    catch (err) {
      console.log("Error: ", err)
    }
   }

  const buttonRender = (val) => {
    switch(val){
      case 0:
        return (<div><Button onClick={swap} className={classes.root} fullWidth >SWAP
          </Button></div>)
      case 1:
        return (<div><Button onClick={approve} className={classes.root} fullWidth>APPROVE
          </Button></div>)
      case 2:
        return(<div>{setTitle('Confirm Swap')}<Button onClick={executeSwap} className={classes.root} fullWidth>CONFIRM SWAP
          </Button></div>)
      default :
          return ((<div><Button onClick={swap} className={classes.root} fullWidth >SWAP
            </Button></div>))
    }

  }
    return (
     <div>
      {buttonRender(confirmRef.current)}{console.log(confirmRef.current)}
      </div>


    )
  };

export default MainButton