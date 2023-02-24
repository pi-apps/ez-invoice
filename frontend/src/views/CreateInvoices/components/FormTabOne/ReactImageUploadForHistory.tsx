import { AddIcon, CloseIcon, Flex, Text } from "@devfedeltalabs/pibridge_uikit";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import { useDispatch } from "react-redux";
import { AppDispatch } from "state";
import { GetHistory } from "state/history";
import { fectchChangeImgHistory, getImageFileHistory } from "state/history/actions";
import { getDataImages } from "state/preview/actions";
import { getUser } from "state/user";
import styled from "styled-components";
import { createInvoice_text } from "translation/languages/createInvoice_text";
import { createInvoiceTranslate } from "translation/translateArrayObjects";

import "../styles";

function ReactImageUploadForHistory({images , setValue, imagesInvoice }) {
  const history = GetHistory()
  const dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{
    async function convertImage() {
      const url = imagesInvoice
      const fileName = 'logo.png'
      const response =  await fetch(url)
      const blob = await response.blob()
      const file = new File([blob], fileName)
      dispatch(getImageFileHistory({ imageFile: file }))
    }
    if( imagesInvoice?.length ) {
      convertImage()
    }
  },[imagesInvoice])

  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    dispatch(getDataImages(
      { images: imageList } 
    ))
  };
  const onImageDelete = () => {
    dispatch(getDataImages(
      { images: null }
    ))
    dispatch(fectchChangeImgHistory({ isChangeImgHistory: true })); 
  }
  

  // translate 
  const DataAb = getUser();
  const languageUserApi = DataAb?.language
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
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            { (  history?.isChangeImgHistory === true && ( images?.length === 0 || images === null ) ) &&
              <CsButtonAdd onClick={onImageUpload} {...dragProps}>
                  <CsAddIcon color="white" />
                  <CsText ml="10px">{stateText.text_add_your_logo}</CsText>
              </CsButtonAdd>
            }
            { ( images?.length > 0 || images !== null && history?.isChangeImgHistory === false ) &&
              <Flex mt='1rem'alignItems="center" style={{gap:"15px"}}>
                <Flex position='relative'>
                  <CsAvatar src={imageList[0].data_url} alt="logo" />
                  <CsButtonClose onClick={() => { dispatch(fectchChangeImgHistory({ isChangeImgHistory: true })); onImageDelete() } }><CloseIcon/></CsButtonClose>
                </Flex>

                <div className="image-item__btn-wrapper" style={{display: 'flex', gap: '10px'}}>
                  <CsButtonAdd 
                      onClick={()=> {onImageUpdate(0); dispatch(fectchChangeImgHistory({ isChangeImgHistory: true }))}}
                     >
                      <CsText>{stateText.text_update}</CsText>
                  </CsButtonAdd>
                </div>
              </Flex>
            }
            { ( imagesInvoice.length > 0 && history?.isChangeImgHistory === false ) &&
                <Flex mt='1rem'alignItems="center" style={{gap:"15px"}}>
                  <Flex position='relative'>
                    <CsAvatar src={imagesInvoice} alt="logo" />
                    <CsButtonClose onClick={() => { dispatch(fectchChangeImgHistory({ isChangeImgHistory: true })); onImageDelete() } }><CloseIcon/></CsButtonClose>
                  </Flex>

                  <div className="image-item__btn-wrapper" style={{display: 'flex', gap: '10px'}}>
                    <CsButtonAdd onClick={() => { onImageUpdate(0); dispatch(fectchChangeImgHistory({ isChangeImgHistory: true }))}}><CsText>{stateText.text_update}</CsText>
                    </CsButtonAdd>
                  </div>
                </Flex>
            }
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default ReactImageUploadForHistory

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
  right: -9px;
  top: -10px;
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
`