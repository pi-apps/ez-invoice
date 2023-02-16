
import { Button, Flex, Modal, Text } from '@devfedeltalabs/pibridge_uikit';
import DownLoadIcon from 'components/Svg/Icons/DowloadIcon';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { axiosClient } from '../../config/htttp';
import { AppDispatch } from '../../state';
import { setUser } from '../../state/user/actions';
import { AuthResult, PaymentDTO } from '../Menu/UserMenu/type';

interface Props {
    onDismiss?: () => void
}

const DownloadModal: React.FC<Props> = ({ onDismiss }) => {
    const { t } = useTranslation()
    const dispatch = useDispatch<AppDispatch>();
    
    const signIn = async () => {
        const scopes = ['username', 'payments'];
        // const authResult: AuthResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
        const authResult: AuthResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
        const loginUser = await signInUser(authResult);
        // setUserData(authResult.user);
        if(loginUser){
          const userInfor = await axiosClient.get('user/info');
          if(userInfor){
            dispatch(setUser(userInfor.data));
          }
        }
    }

    const signInUser = async (authResult: AuthResult) => {
        return await axiosClient.post('/user/signin', {authResult});
      }
      const onIncompletePaymentFound = (payment: PaymentDTO) => {
        console.log("onIncompletePaymentFound", payment);
        return axiosClient.post('/payments/incomplete', {payment});
      }
    
    function declineClick(){
        onDismiss()
    }
    function accpetClick(){
        signIn();
        onDismiss();
    }
  return (
    <Modal title="" onDismiss={onDismiss} maxWidth="550px" modalIcon={<DownLoadIcon />}>
        <Flex flexDirection="column" width="100%">
            <Text bold fontSize='18px' width="100%" textAlign="center">{t('download_popup.header')}</Text>
            <Text width="100%" textAlign="center" color='textSubtle' mt="10px">{t('download_popup.content')}</Text>
            
            <Flex mt="1rem" justifyContent="space-between">
                <CsButton padding="0" width="48%" variant="secondary">
                    {t('download_popup.button_hard_disk')}
                </CsButton>
                <Button padding="0" width="48%">
                    {t('download_popup.button_goolge_drive')}
                </Button>
            </Flex>
        </Flex>
    </Modal>
  )
}
const CsButton = styled(Button)`
  color: #6B39F4;
`

export default DownloadModal


