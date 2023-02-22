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
import { getInvoiceId } from "state/newInvoiceId";
import { getAccessToken, getUser } from "state/user";
import { AnyARecord } from "dns";
import { GetTranslateHolder } from "hooks/TranSlateHolder";

interface Props {
  onDismiss?: () => void;
  invoiceId: any;
}

const DownloadModal: React.FC<Props> = ({ onDismiss, invoiceId }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGGDrive, setIsLoadingGGDrive] = useState(false);
  const [urlDownload, setUrlDownload] = useState();
  const { toastSuccess, toastError } = useToast();

  const DataAb = getUser();
  const languageUserApi = DataAb?.language
  // const invoiceId = getInvoiceId();

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
    toastSuccess('', <Text>{invoiceId} {sendLanguage} {token}</Text>)
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
      toastError(JSON.stringify(error?.message))
    }
  };

  useEffect(() => {
    getUrlDownload()
  }, [invoiceId])

  // Translate
  const listText = {
    download_invoice: "Download Invoice",
    choose_file: "Please choose the location for file.",
    hard_disk: "Hard disk",
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
      setStateText({
      download_invoice: resDownloadInvoice,
      choose_file: resChooseFile,
      hard_disk: resHardDisk,
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
              <FlexUrl>
                <TextUrl>{shortUrl(urlDownload)}</TextUrl>
              </FlexUrl>
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

const TextUrl = styled(Text)``

export default DownloadModal;
