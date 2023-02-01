
import { Button, Flex, Modal, Text } from '@phamphu19498/pibridge_uikit';
import { AccpetIcon, ClockedIcon, UserIcon } from 'components/Svg';

interface Props {
    onDismiss?: () => void
}

const AccpetModal: React.FC<Props> = ({ onDismiss }) => {
    function declineClick(){
        onDismiss()
    }
    function accpetClick(){
        window.location.href = '/register';
        onDismiss()
    }
  return (
    <Modal title="" onDismiss={onDismiss} maxWidth="550px" modalIcon={<AccpetIcon/>}>
        <Flex flexDirection="column" width="100%">
            <Text bold fontSize='18px' width="100%" textAlign="center">Share information with EzInvoice?</Text>
            <Text width="100%" textAlign="center" color='textSubtle' mt="10px">EzInvoice is requesting the following data or permissions</Text>
            <Flex flexDirection='row' alignItems="start" justifyContent='flex-start' style={{gap:"10px"}} mt="10px">
                <Flex>
                    <ClockedIcon/>
                </Flex>
                <Text color='textSubtle'>Auth: Authenticate you on this app with your Pi account</Text>
            </Flex>
            <Flex flexDirection='row' alignItems="start" justifyContent='flex-start' style={{gap:"10px"}} mt="10px">
                <Flex>
                    <UserIcon/>
                </Flex>
                <Text color='textSubtle'>Username: Your Pi username</Text>
            </Flex>
            <Flex mt="1rem" justifyContent="space-between">
                <Button width="48%" variant='secondary' onClick={declineClick}>
                    Decline
                </Button>
                <Button width="48%" onClick={accpetClick}>
                        Allow
                </Button>
            </Flex>
        </Flex>
    </Modal>
  )
}
export default AccpetModal


