import { Button, Flex, Text } from "@phamphu19498/pibridge_uikit";
import { AddIcon } from "components/Svg";
import React from "react";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import styled from "styled-components";

function ReactImageUpload({images , setImages }) {
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // console.log(imageList, addUpdateIndex);
    console.log('imageList',imageList);
    setImages(imageList);
  };

  return (
    <div>
      <ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg"]}
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
                images.length === 0 && (
                    <CsButtonAdd onClick={onImageUpload}
                        {...dragProps}>
                        <CsAddIcon />
                        <CsText>Add your logo</CsText>
                    </CsButtonAdd>
                )
            }


            {imageList.map((image, index) => {
                const imageName = image?.file?.name
                return(
              <Flex mt='1rem' key={index} alignItems="center">
                <CsAvatar src={image.data_url} alt={imageName} />
                <div className="image-item__btn-wrapper">
                  <CsButtonUpdate onClick={() => onImageUpdate(index)}>Update</CsButtonUpdate>
                  <CsButtonRemove onClick={() => onImageRemove(index)}>Remove</CsButtonRemove>
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
    width: 100px;
    height: 100px;
    object-fit: contain;
    border-radius: 50%;
    margin-right: 10px;
`
const CsButtonUpdate = styled(Button)`
  margin-top: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid #E2E8F0;
  margin-right: 10px;

`
const CsButtonRemove = styled(Button)`
  margin-top: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid #E2E8F0;
`

const CsButtonAdd = styled(Button)`
  margin-top: 1rem;
  margin-bottom: 12px;
  border-bottom: 1px solid #E2E8F0;
`

const CsAddIcon = styled(AddIcon)`
  margin-right: 10px;
`
const CsText = styled(Text)`
  font-size: 12px;
  color: #FFFFFF;
  font-weight: 700;
  margin-left: 10px;
`
export default ReactImageUpload