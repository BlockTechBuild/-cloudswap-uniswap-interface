import { ethers } from 'ethers'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import WalletStatus from './WalletStatus'

const styles = {
    root: {
      background: "#E6F7FF",
      borderRadius: 10,
      width: 207,
      height: 40,
      "&:hover": {
        background: "#E6F7FF"
      },
      m: 0,
    }
  };

const useStyles = makeStyles(styles);

const ConnectButton = ({ userBalance, setUserBalance, userAddress, setUserAddress, setSigner}) => {

  const classes = useStyles();
  const [formattedAddress, setFormattedAddress] = useState();
  const [formattedBalance, setFromattedBalance] = useState();

  const getWalletInfo = async (signer, provider) => {
    setSigner(signer);
    const address = await signer.getAddress()
    setFormattedAddress(address.substring(0, 4) + '...' + address.substring(address.length - 3));
    console.log(formattedAddress);
    const bigBalance = await provider.getBalance(address)
    const balance = ethers.utils.formatUnits(bigBalance._hex)
    setFromattedBalance(balance.substring(0, 4))
    setUserBalance(balance);
    setUserAddress(address);
}

  const requestAccount = async () => {
  return window.ethereum.request({ method: 'eth_requestAccounts',});
}

  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount().then(() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        getWalletInfo(signer, provider);

      })
    }
  }

    return <Button className={classes.root} onClick={connectWallet} align="left">
    <WalletStatus userBalance={formattedBalance} userAddress={formattedAddress}/></Button>;
  };

export default ConnectButton