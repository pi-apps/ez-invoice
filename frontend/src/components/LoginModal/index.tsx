
import { Button, Flex, Modal, Text } from '@phamphu19498/pibridge_uikit';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { axiosClient } from '../../config/htttp';
import { AppDispatch } from '../../state';
import { setUser } from '../../state/user/actions';
import { AuthResult, PaymentDTO } from '../Menu/UserMenu/type';
import LoginIcon from '../Svg/Icons/LoginIcon';

interface Props {
    onDismiss?: () => void
}

const LoginModal: React.FC<Props> = ({ onDismiss }) => {
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
    <Modal title="" onDismiss={onDismiss} maxWidth="550px" modalIcon={<LoginIcon/>}>
        <Flex flexDirection="column" width="100%">
            <Text bold fontSize='18px' width="100%" textAlign="center">{t('require_login_popup.header')}</Text>
            <Text width="100%" textAlign="center" color='textSubtle' mt="10px">{t('require_login_popup.content')}</Text>
            
            <Flex mt="1rem" justifyContent="space-between">
                <Button width="48%" variant='secondary' onClick={declineClick}>
                    {t('require_login_popup.button_cancel')}
                </Button>
                <Button width="48%" onClick={accpetClick}>
                    {t('require_login_popup.button_login')}
                </Button>
            </Flex>
        </Flex>
    </Modal>
  )
}
export default LoginModal

