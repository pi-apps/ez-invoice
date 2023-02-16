import { Button, Flex, Text } from "@phamphu19498/pibridge_uikit";
import { useState } from "react";
import { AddIcon } from "components/Svg";
import ImageUploading from "react-images-uploading";
import styled from "styled-components";
import { Translate } from "react-auto-translate";

function ReactImageUpload({images , setValue }) {
  const [ logoImg, setLogoImages] = useState([]);
  const onChange = (imageList, addUpdateIndex) => {
    setValue("logo",imageList[0].file);
    setLogoImages(imageList)
  };

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
                        <CsText ml="10px">Add your logo</CsText>
                    </CsButtonAdd>
                )
            }
            {logoImg.map((image, index) => {
                const imageName = logoImg[0].file?.name
                return(
                  <Flex mt='1rem' key={index} alignItems="center">
                    <CsAvatar src={logoImg[0].data_url} alt={imageName} />
                    <div className="image-item__btn-wrapper">
                      <CsButtonAdd onClick={() => onImageUpdate(index)}><CsText><Translate>Update</Translate></CsText></CsButtonAdd>
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
const CsButtonUpdate = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid #E2E8F0;
  margin-right: 10px;

`
const CsButtonRemove = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid #E2E8F0;
`

const CsButtonAdd = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content: center;
  width: fit-content;
  cursor: pointer;
  height: 45px;
  background: #6B39F4;
  border-radius: 6px;
  margin-bottom: 12px;
  padding: 0 20px;
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