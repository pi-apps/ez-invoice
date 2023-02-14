
import { Button, Flex, Modal, Text } from '@phamphu19498/pibridge_uikit';
import { AccpetIcon, ClockedIcon, UserIcon } from 'components/Svg';
import { useTranslation } from 'react-i18next';

interface Props {
    onDismiss?: () => void
}

const AccpetModal: React.FC<Props> = ({ onDismiss }) => {
    const { t } = useTranslation() 
    
    function declineClick(){
        onDismiss()
    }
  return (
    <Modal title="" onDismiss={onDismiss} maxWidth="550px" margin='0 24px' modalIcon={<AccpetIcon/>}>
        <Flex flexDirection="column" width="100%">
            <Text bold fontSize='18px' width="100%" textAlign="center">{t('first_login_popup.header')}</Text>
            <Text width="100%" textAlign="center" color='textSubtle' mt="10px">{t('first_login_popup.quote')}</Text>
            <Flex flexDirection='row' alignItems="start" justifyContent='flex-start' style={{gap:"10px"}} mt="10px">
                <Flex>
                    <ClockedIcon/>
                </Flex>
                <Text color='textSubtle'>{t('first_login_popup.auth')}</Text>
            </Flex>
            <Flex flexDirection='row' alignItems="start" justifyContent='flex-start' style={{gap:"10px"}} mt="10px">
                <Flex>
                    <UserIcon/>
                </Flex>
                <Text color='textSubtle'>{t('first_login_popup.username')}</Text>
            </Flex>
            <Flex mt="1rem" justifyContent="space-between">
                <Button width="48%" variant='secondary' onClick={declineClick}>
                    {t('first_login_popup.button_decline')}
                </Button>
                <Button width="48%">
                    {t('first_login_popup.button_allow')}
                </Button>
            </Flex>
        </Flex>
    </Modal>
  )
}
export default AccpetModal


