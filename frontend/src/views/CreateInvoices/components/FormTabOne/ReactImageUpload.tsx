import { Button, Flex, Text } from "@devfedeltalabs/pibridge_uikit";
import { useEffect, useState } from "react";
import { AddIcon, CloseIcon } from "components/Svg";
import ImageUploading from "react-images-uploading";
import styled from "styled-components";
import { Translate } from "react-auto-translate";
import { getUser } from "state/user";
import { GetTranslateHolder } from "hooks/TranSlateHolder";
import { AppDispatch } from "state";
import { useDispatch } from "react-redux";
import { getDataImages } from "state/preview/actions"
import { createInvoice_text } from "translation/languages/createInvoice_text";
import { createInvoiceTranslate } from "translation/translateArrayObjects";

function ReactImageUpload({images , setValue }) {
  const [ logoImg, setLogoImages] = useState([]);
  const dispatch = useDispatch<AppDispatch>()
  const onChange = (imageList, addUpdateIndex) => {
    setValue("logo",imageList[0].file);
    setLogoImages(imageList)
    dispatch(getDataImages(
      { images: imageList }
    ))
  };
  const onImageDelete = () => {
    setLogoImages([])
  }

  const DataAb = getUser();
  const languageUserApi = DataAb?.language
   // Translate
   const [stateText, setStateText] = useState(createInvoice_text);
   const requestTrans = async () => {
     try {
       const resData = await createInvoiceTranslate(languageUserApi);
       setStateText(resData)
     } catch (error) {
       console.log(error)
     }
   }
   useEffect(() => {
     if (languageUserApi) {
       requestTrans();
     } else if (!languageUserApi) {
       setStateText(createInvoice_text);
     }
   }, [languageUserApi]);

  return (
    <div>
      <ImageUploading
        value={images}
        onChange={onChange}
        dataURLKey="data_url"
        acceptType={['jpg','png']}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          <div>
            {
                logoImg.length === 0 && (
                    <CsButtonAdd onClick={onImageUpload}>
                        <CsAddIcon />
                        <CsText ml="10px">{stateText.text_add_your_logo}</CsText>
                    </CsButtonAdd>
                )
            }
            {logoImg.map((image, index) => {
                const imageName = logoImg[0].file?.name
                return(
                  <Flex mt='1rem' key={index} alignItems="center">
                    <Flex position='relative'>
                      <CsAvatar src={logoImg[0].data_url} alt={imageName} />
                      <CsButtonClose onClick={() => onImageDelete()}><CloseIcon/></CsButtonClose>
                    </Flex>

                    <div className="image-item__btn-wrapper" style={{display: 'flex', gap: '10px'}}>
                      <CsButtonAdd onClick={() => onImageUpdate(index)}><CsText>{stateText.text_update}</CsText>
                      </CsButtonAdd>
                    </div>
                  </Flex>
            )})}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

const CsAvatar = styled.img`
    width: 60px;
    height: 60px;
    object-fit: contain;
    border-radius: 50%;
    margin-right: 10px;
    border: 1px solid #6B39F4;
`

const CsButtonAdd = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content: center;
  width: fit-content;
  cursor: pointer;
  height: 35px;
  background: #6B39F4;
  border-radius: 6px;
  margin-bottom: 12px;
  padding: 0 20px;
`
const CsButtonClose = styled.div`
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content: center;
  width: fit-content;
  cursor: pointer;
  height: fit-content;
  border-radius: 6px;
  position: absolute;
  border-radius: 50%;
  background: #fff;
  padding: 4px;
  right: 9px;
  top: 0px;
  border: 1px solid transparent;
  &:hover{
    border: 1px solid #4949491a;
  }
`

const CsAddIcon = styled(AddIcon)`
  margin-right: 10px;
`
const CsText = styled(Text)`
  font-size: 12px;
  color: #FFFFFF;
  font-weight: 700;
  /* margin-left: 10px; */
`
export default ReactImageUpload