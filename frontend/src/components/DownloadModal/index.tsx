import { AutoRenewIcon, Button, Flex, Modal, Text } from "@devfedeltalabs/pibridge_uikit";
import DownLoadIcon from "components/Svg/Icons/DowloadIcon";
import { useEffect, useState } from "react";
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

interface Props {
  onDismiss?: () => void;
}

const DownloadModal: React.FC<Props> = ({ onDismiss }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGGDrive, setIsLoadingGGDrive] = useState(false);
  const [urlDownload, setUrlDownload] = useState();
  const { toastSuccess, toastError } = useToast();

  const invoiceId = localStorage.getItem('invoiceIdStorage')

  // language
  const [language, setLanguage] = useState("en");
  const getLanguage = async () => {
    const data = await sessionStorage.getItem("language");
    setLanguage(data);
  };
  useEffect(() => {
    getLanguage();
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  const accessTokenAuth = getAccessTokenAuth();

  const uploadFileToDrive = async (accessToken) => {
    setIsLoadingGGDrive(true)
    try {
      // Download the PDF file from the URL
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
      toastSuccess(null, <Translate>Upload Success</Translate>);
    } catch (error) {
      setIsLoadingGGDrive(false)
      toastError(null, <Translate>Upload Failed</Translate>);
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
    try {
      const response = await axiosClient.get(
        `/invoice/download?invoiceId=${invoiceId}&language=vi`
      );
      console.log('response', response)
      setUrlDownload(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUrlDownload()
  }, [invoiceId])

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
            <Translate>Download Invoice</Translate>
          </Text>
          <Text width="100%" textAlign="center" color="textSubtle" mt="10px">
            <Translate>Please choose the location for file.</Translate>
          </Text>

          <Flex mt="1rem" justifyContent="space-between">
            <LinkDownload href={urlDownload} download target="_blank">
              <CsButton
                padding="0"
                width="100%"
                variant="secondary"
                disabled={!urlDownload && isLoading}
                onClick={() => getUrlDownload()}
                endIcon={isLoading ? <AutoRenewIcon style={{margin: 0}} spin color="#fff"/> : <Translate>Hard disk</Translate>}
              />
            </LinkDownload>

            {accessTokenAuth ? (
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
            )}
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

export default DownloadModal;
