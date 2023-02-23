import { AutoRenewIcon, Button, Flex, Modal, Text } from "@devfedeltalabs/pibridge_uikit";
import DownLoadIcon from "components/Svg/Icons/DowloadIcon";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// Component
import TranSlatorModal from "components/TranSlatorModal/TranSlatorModal";
import useToast from "hooks/useToast";
import { AppDispatch } from "state";
import { getAccessTokenAuth } from "state/googleAuth";
import { getAccessToken, getUser } from "state/user";
import { download_text } from "translation/languages/download_text";
import { downloadTranslate } from "translation/translateArrayObjects";
import { axiosClient } from "../../config/htttp";

interface Props {
  onDismiss?: () => void;
  invoiceId: any;
}

const DownloadModal: React.FC<Props> = ({ onDismiss, invoiceId }) => {

  const [isOpenTooltip, setOpenTooltip] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGGDrive, setIsLoadingGGDrive] = useState(false);
  const [urlDownload, setUrlDownload] = useState();
  const { toastSuccess, toastError } = useToast();

  const DataAb = getUser();
  const languageUserApi = DataAb?.language

  const dispatch = useDispatch<AppDispatch>();
  const accessTokenAuth = getAccessTokenAuth();
  const token = getAccessToken()


  const getUrlDownload = async () => {
    setIsLoading(true);
    const sendLanguage = languageUserApi ?? 'en'
    try {
      const response = await axiosClient.get(
        `/invoice/download?invoiceId=${invoiceId}&language=${sendLanguage}`, {
          headers: {
            "Authorization": token
          }
        }
      );
      setUrlDownload(response.data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toastError('Error', error?.response?.data?.message)
    }
  };

  useEffect(() => {
    getUrlDownload()
  }, [invoiceId])

  // Translate
  const [stateText, setStateText] = useState(download_text);
  const requestTrans = async () => {
    try {
      const resData = await downloadTranslate(languageUserApi);
      setStateText(resData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (languageUserApi) {
      requestTrans();
    } else if (!languageUserApi) {
      setStateText(download_text);
    }
  }, [languageUserApi]);

  const shortUrl = (url: any) => {
    const stringWalletAdrress = String(url);
    const short = `${stringWalletAdrress.substring(
      0,
      15,
    )}...${stringWalletAdrress.substring(stringWalletAdrress.length - 8)}`;
    return short;
  };

  // Copy Url
  function displayTooltipCode() {
    setOpenTooltip(true)
    setTimeout(() => {
        setOpenTooltip(false)
    }, 3000)
  }

  const copyLinkReferralCode = () => {
    if (navigator.clipboard && navigator.permissions) {
        navigator.clipboard.writeText(urlDownload).then(() => displayTooltipCode())
    } else if (document.queryCommandSupported('copy')) {
      const ele = document.createElement('textarea')
      ele.value = urlDownload
      document.body.appendChild(ele)
      ele.select()
      document.execCommand('copy')
      document.body.removeChild(ele)
      displayTooltipCode()
    }
  }

  return (
    <TranSlatorModal>
      <Modal
        title=""
        onDismiss={onDismiss}
        maxWidth="350px"
        width="100%"
        modalIcon={<DownLoadIcon />}
      >
        <Flex flexDirection="column" width="100%">
          <Text bold fontSize="18px" width="100%" textAlign="center">
            {stateText.text_download_invoice}
          </Text>
          <Text width="100%" textAlign="center" color="textSubtle" mt="10px">
            {stateText.text_choose_file}
          </Text>

          <Flex mt="1rem" justifyContent="center" width="100%" style={{gap:'15px'}} flexDirection="column">
              {urlDownload ? 
                <FlexUrl width="100%" style={{gap:'15px'}} flexDirection="column" justifyContent="center" alignItems="center">
                  <TextUrl>{shortUrl(urlDownload)}</TextUrl>
                  <Flex position="relative" width="100%" justifyContent="center">
                    <Button onClick={copyLinkReferralCode}>
                      {stateText.text_copy}
                    </Button>
                    <Tooltip isTooltipDisplayed={isOpenTooltip}>{stateText.text_coppied}</Tooltip>
                  </Flex>
                  
                </FlexUrl> :
                <Button disabled endIcon={<AutoRenewIcon style={{margin: 0}} spin color="black"/>} />
              }
          </Flex>
        </Flex>
      </Modal>
    </TranSlatorModal>
  );
};

const FlexUrl = styled(Flex)``

const TextUrl = styled(Text)`
  margin-right: 10px;
`

const Tooltip = styled.div<{ isTooltipDisplayed?: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline-block' : 'none')};
  position: absolute;
  padding: 12px 24px;
  top: -45px;
  right: -5px;
  text-align: center;
  background-color: white;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 8px;
  width: auto;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
`

export default DownloadModal;
