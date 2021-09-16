import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { ethers } from 'ethers'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
import Tokens from '../addresses'

const symbols = ['', 'WETH', 'DAI', 'BAT', 'USDC', 'UNI']

const useStyles = makeStyles({
   btn: {
    borderRadius: 10,
    width: '97px',
    height: '36px'
   }
  });

  export const FromSelect = ({token, setToken, IERC20, userAddress, tokenBal, setTokenBal}) => {

    const classes = useStyles();

    const fetchTokenBal = async () => {
      if (token){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const address = Tokens[token];
        const contract = new ethers.Contract(address, IERC20, provider)
        try {
          const data = await contract.balanceOf(userAddress)
          const balance = ethers.utils.formatUnits(data._hex)
          setTokenBal(parseFloat(balance).toFixed(3))
        } catch (err) {
          console.log("Error: ", err)
        }
      }
    }

    const handleChange = (event) => {
        setToken(event.target.value);
    };

    useEffect(() => {
      fetchTokenBal()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

      //console.log(Tokens);
    return (
        <Box className={classes.btn} boxShadow={6} mt={2}>
        <Button className={classes.btb} boxShadow={6} disableRipple={true}>
        <Select
          labelId="simple-select-outlined-label"
          id="simple-select-outlined"
          onChange={handleChange}
          label="FROM"
          style={{minWidth: 35}}
          disableUnderline>
          {symbols.map(el => <MenuItem value={el}>{el}</MenuItem>)}
        </Select>
        </Button>
        </Box>
    )
  }

export default FromSelect