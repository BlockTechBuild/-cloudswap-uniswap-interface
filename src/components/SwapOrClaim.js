import Box from '@material-ui/core/Box'
import SwapButton from './Swap'
import ClaimButton from './Claim'

const customProps = {
    display: 'flex',
    bgcolor: 'transparent',
    borderColor: '#E6F7FF',
    borderRadius: '10px',
    m: 1,
    border: 4,
    style: { width: '260px', height: '59px' },
  }

const SwapOrClaim = ({ setSwitchUI, switchUI }) => {

    return (
        <Box {...customProps}>
            <Box p={1} pl={3}>
                <SwapButton
                setSwitchUI={setSwitchUI}
                switchUI={switchUI}
                />
            </Box>
            <Box p={1} pr={3}>
                <ClaimButton
                setSwitchUI={setSwitchUI}
                switchUI={switchUI}
                />
            </Box>
        </Box>
    )
}

export default SwapOrClaim