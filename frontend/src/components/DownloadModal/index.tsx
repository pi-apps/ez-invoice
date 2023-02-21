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
      fetch(response.data).then(response => {
        console.log("response", response);
          response.blob().then(blob => {
              // Creating new object of PDF file
              const fileURL = window.URL.createObjectURL(blob);
              // Setting various property values
              let alink = document.createElement('a');
              alink.href = fileURL;
              alink.download = `${invoiceId}.pdf`;
              alink.click();
          })
      })
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toastError(JSON.stringify(error?.message))
    }
  };

  useEffect(() => {
    getUrlDownload()
  }, [invoiceId])

  return (<></>
    // <TranSlatorModal>
    //   <Modal
    //     title=""
    //     onDismiss={onDismiss}
    //     maxWidth="550px"
    //     modalIcon={<DownLoadIcon />}
    //   >
    //     <Flex flexDirection="column" width="100%">
    //       <Text bold fontSize="18px" width="100%" textAlign="center">
    //         <Translate>Download Invoice</Translate>
    //       </Text>
    //       <Text width="100%" textAlign="center" color="textSubtle" mt="10px">
    //         <Translate>Please choose the location for file.</Translate>
    //       </Text>

    //       <Flex mt="1rem" justifyContent="space-between">
    //         <LinkDownload href={urlDownload} download>
    //           {urlDownload},
    //           {invoiceId}
    //           Hard disk
    //           <CsButton
    //             padding="0"
    //             width="100%"
    //             variant="secondary"
    //             disabled={!urlDownload && isLoading}
    //             onClick={() => getUrlDownload()}
    //             endIcon={isLoading ? <AutoRenewIcon style={{margin: 0}} spin color="#fff"/> : <Translate>Hard disk</Translate>}
    //           >
    //           </CsButton> 
    //           </LinkDownload>

    //         {/* {accessTokenAuth ? (
    //           <Button
    //             disabled={isLoading && !urlDownload}
    //             endIcon={isLoadingGGDrive ? <AutoRenewIcon style={{margin: 0}} spin color="#fff"/> : <Translate>Google Drive</Translate>}
    //             padding="0"
    //             width="48%"
    //             onClick={() => handleOpenPicker()}
    //           />
    //         ) : (
    //           <Button 
    //             disabled={isLoading}
    //             onClick={handleLoginAuthGoogle}
    //             endIcon={isLoading ? <AutoRenewIcon style={{margin: 0}} spin color="#fff"/> : <Translate>Login Google</Translate>}
    //           />
    //         )} */}
    //       </Flex>
    //     </Flex>
    //   </Modal>
    // </TranSlatorModal>
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

const CsText = styled(Text)`
  justify-content: center;
`

export default DownloadModal;
