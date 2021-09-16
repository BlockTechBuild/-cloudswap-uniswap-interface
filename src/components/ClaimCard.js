import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AirdropFactory from '../abis/AirdropFactory.json'
import AirdropERC20 from '../abis/AirdropERC20.json'

const airdropFactory = '0xB4f80F498ec97B4b3aBCB6d96452606dd8428BCa'
let tokens = [
    {name : 'RAIN', address: '', claimable: '', active: ''},
    {name: 'THUNDER', address: '', claimable: '', active: ''},
    {name: 'FROST', address: '', claimable: '', active: ''},
    {name: 'SLEET', address: '', claimable: '', active: ''},
    {name: 'VAPOUR', address: '', claimable: '', active: ''},
]

const customProps = {
    display: 'flex',
    bgcolor: '#E6F7FF',
    borderRadius: '10px',
    boxShadow : 8,
    m: 1,
    style: { width: '496px', height: '395px' },
  }

  const customBorderProps = {
    border: 3,
    borderRadius: 10,
    borderColor: '#0ED4FF',
    style: {width: '320px', height: '36px',}
}


const ClaimCard = ({ signer, userAddress }) => {

    const [list, setList] = useState(false);

    const populateList = async () => {
        if (typeof window.ethereum !== 'undefined'){
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(airdropFactory, AirdropFactory, provider)
            try {
                const addresses = await contract.getTokens();
                for(let i = 0; i < addresses.length; i++){ //maps names to addresses
                    tokens[i].address = addresses[i];
                }
            } catch (err) {
                console.log("Error: ", err)
            }
            isClaimed(provider);
        }
    }

    const isClaimed = async (provider) => {
        tokens.forEach( async token => {
            const contract = new ethers.Contract(token.address, AirdropERC20, provider);
            try {
                const data = await contract.claimable(userAddress)
                const claimable = ethers.utils.formatUnits(data._hex)
                token.claimable = claimable;
                if(claimable > 0){
                    token.active = true;
                } else{
                    token.active = false;
                }
                }catch(err) {
                    console.log("Error: ", err)
                }
            });
        setList(true);
    }

    const claim = async (e) => {
        if (typeof window.ethereum !== 'undefined'){
            const address = e.currentTarget.dataset.buttonKey;
            const contract = new ethers.Contract(address, AirdropERC20, signer)
            try {
                await contract.claim()
            }
            catch(err) {
                console.log("Error: ", err)
            }
        }
        populateList();
    }

    useEffect(() => {
        populateList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [list]);

    return (
        <Box {...customProps}>{ list ? <Grid container style={{flexGrow: 1,
            paddingTop: 10, paddingLeft:10, paddingRight:10}}>
                {tokens.map(token => {
                return (
                    <Grid container>
                    <Grid item xs={8}>
                        <Box {...customBorderProps}>
                            <Typography  align="center">
                            {`${token.claimable} ${token.name}`}
                            </Typography>
                        </Box>
                    </Grid>
                        <Grid item xs={4} align="center">
                        {token.active ?
                        <Button
                            data-button-key={token.address}
                            style={{backgroundColor:'#91D5FF', color: '#FFFFFF'}}
                            variant="contained"
                            disableElevation={true}
                            color="primary"
                            onClick={claim}>CLAIM</Button>
                            : <Button variant="contained" color="primary"
                            disabled>
                                CLAIMED
                            </Button> }
                    </Grid>
                </Grid>
                ) })}
        </Grid> : <CircularProgress />}

        </Box>
    )
}

export default ClaimCard