import { AutoRenewIcon, Button, Flex, Modal, Text } from "@devfedeltalabs/pibridge_uikit";
import DownLoadIcon from "components/Svg/Icons/DowloadIcon";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { Translate } from "react-auto-translate";

// Component
import { axiosClient } from "../../config/htttp";
import { SignInWithGoogle } from "firebase.config";
import useToast from "hooks/useToast";
import { AppDispatch } from "state";
import { getAccessTokenAuth } from "state/googleAuth";
import { setAccessToken } from "state/googleAuth/actions";
import TranSlatorModal from "components/TranSlatorModal/TranSlatorModal";
import { getAccessToken, getUser } from "state/user";
import { GetTranslateHolder } from "hooks/TranSlateHolder";

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

  const uploadFileToDrive = async (accessToken) => {
    setIsLoadingGGDrive(true)
    try {
      const response1 = await fetch(
        `${urlDownload}`
      );
      const pdfData = await response1.arrayBuffer();
      const pdfByteArray = new Uint8Array(pdfData);

      const response = await axios({
        url: "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable",
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        data: {
          name: `${invoiceId}`,
          mimeType: "application/pdf",
        },
      });
      const location = response.headers.location;
      await axios({
        url: location,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/pdf",
          "Content-Length": `${pdfByteArray.length}`,
        },
        data: pdfByteArray,
      });
      setIsLoadingGGDrive(false)
      toastSuccess(null, <Text style={{justifyContent: 'center'}}><Translate>Upload Success</Translate></Text>);
    } catch (error) {
      setIsLoadingGGDrive(false)
      dispatch(setAccessToken(''));
      toastError(null, <Text style={{justifyContent: 'center'}}><Translate>Upload Failed, Your google account has expired, please login again!</Translate></Text>);
    }
  };

  // Sign Firebase
  const handleLoginAuthGoogle = async () => {
    const res = await SignInWithGoogle();
    dispatch(setAccessToken(res));
  };

  const handleOpenPicker = async () => {
    await uploadFileToDrive(accessTokenAuth);
  };
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
  const listText = {
    download_invoice: "Download Invoice",
    choose_file: "Please copy the following link and paste it in browser to download.",
    hard_disk: "Hard disk",
    coppy: "Coppy",
    coppired: "Copired",
  };
  const [stateText, setStateText] = useState(listText);
  const fcTransLateText = async (language) => {
      const resDownloadInvoice = await GetTranslateHolder(
        listText.download_invoice,
        language
      );
      const resChooseFile = await GetTranslateHolder(
        listText.choose_file,
        language
      );
      const resHardDisk = await GetTranslateHolder(
        listText.hard_disk,
        language
      );
      const resCoppy = await GetTranslateHolder(
        listText.coppy,
        language
      );
      const resCoppired = await GetTranslateHolder(
        listText.coppired,
        language
      );
      setStateText({
      download_invoice: resDownloadInvoice,
      choose_file: resChooseFile,
      hard_disk: resHardDisk,
      coppired: resCoppired,
      coppy: resCoppy,
    });
  };

  useEffect(() => {
    if (!languageUserApi) {
      fcTransLateText('en')
    } else fcTransLateText(languageUserApi)
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
        maxWidth="550px"
        modalIcon={<DownLoadIcon />}
      >
        <Flex flexDirection="column" width="100%">
          <Text bold fontSize="18px" width="100%" textAlign="center">
            {stateText.download_invoice}
          </Text>
          <Text width="100%" textAlign="center" color="textSubtle" mt="10px">
            {stateText.choose_file}
          </Text>

          <Flex mt="1rem" justifyContent="center">
              {urlDownload ? 
                <FlexUrl position='relative'>
                  <TextUrl>{shortUrl(urlDownload)}</TextUrl>
                  <ButtonCoppy onClick={copyLinkReferralCode}>
                    {stateText.coppy}
                  </ButtonCoppy>
                  <Tooltip isTooltipDisplayed={isOpenTooltip}>{stateText.coppired}</Tooltip>
                </FlexUrl> :
                <Button disabled endIcon={<AutoRenewIcon style={{margin: 0}} spin color="black"/>} />
              }

            {/* <LinkDownload href={urlDownload} download>
              <CsButton
                padding="0"
                width="100%"
                variant="secondary"
                disabled={!urlDownload && isLoading}
                onClick={() => getUrlDownload()}
                endIcon={isLoading ? <AutoRenewIcon style={{margin: 0}} spin color="#fff"/> : <Text>{stateText.hard_disk}</Text>}
              >
              </CsButton> 
              </LinkDownload> */}

            {/* {accessTokenAuth ? (
              <Button
                disabled={isLoading && !urlDownload}
                endIcon={isLoadingGGDrive ? <AutoRenewIcon style={{margin: 0}} spin color="#fff"/> : <Translate>Google Drive</Translate>}
                padding="0"
                width="48%"
                onClick={() => handleOpenPicker()}
              />
            ) : (
              <Button 
                disabled={isLoading}
                onClick={handleLoginAuthGoogle}
                endIcon={isLoading ? <AutoRenewIcon style={{margin: 0}} spin color="#fff"/> : <Translate>Login Google</Translate>}
              />
            )} */}
          </Flex>
        </Flex>
      </Modal>
    </TranSlatorModal>
  );
};
const CsButton = styled(Button)`
  color: #6b39f4;
`;

const LinkDownload = styled.a`
  color: #6b39f4;
  width: 48%;
  height: 48px;
`;

const FlexUrl = styled(Flex)``

const TextUrl = styled(Text)`
  margin-right: 10px;
`

const Tooltip = styled.div<{ isTooltipDisplayed?: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline-block' : 'none')};
  position: absolute;
  padding: 8px;
  top: -35px;
  right: -15px;
  text-align: center;
  background-color: white;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 16px;
  width: 100px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
`

const ButtonCoppy = styled.button`
    background: #6B39F4;
    border-radius: 10px;
    /* width: 100px; */
    max-width: 100px;
    height: 30  px;
    display: flex;
    font-size: 12px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: white;
    text-transform: uppercase;
`

export default DownloadModal;
