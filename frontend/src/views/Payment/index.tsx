import { Text, Flex, Button, AutoRenewIcon, Skeleton, Image } from "@devfedeltalabs/pibridge_uikit";
import styled from "styled-components";
import Footer from 'components/Footer';
import Nav from 'react-bootstrap/Nav';
import Row from 'components/Layout/Row';
import PageFullWidth from "components/Layout/PageFullWidth"
import { useParams, useNavigate } from 'react-router-dom';
import { Translate } from "react-auto-translate";
import { getAccessToken, getUser } from "state/user";
import { GetAnInvoice } from "state/invoice";
import useToast from "hooks/useToast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "state";
import { fetchLoading } from "state/invoice/actions";
import { setUser, isLoading, accessToken } from "state/user/actions";
import { axiosClient } from "config/htttp";
import { AuthResult, PaymentDTO } from "components/Menu/UserMenu/type";
import { GetDataPayment, PaymentCore } from "state/payment";
import { usePayment } from "./hook/usePayment";
import { fetchDataUser } from "state/payment/actions";
import { Fragment } from "react";

const Payment = () => {
    const  { signature } = useParams()
    
    const items = GetAnInvoice();
    const { toastSuccess, toastError } = useToast()
    const userData = getUser()
    const token = getAccessToken()
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const loading = items?.isLoading
    const onIncompletePaymentFound = (payment: PaymentDTO) => {
        console.log("onIncompletePaymentFound", payment);
        return axiosClient.post("/payments/incomplete", { payment });
    };
    const signInUser = async (authResult: AuthResult) => {
        return await axiosClient.post("/user/signin", { authResult });
    };
    const signIn = async () => {
        try {
            const scopes = ["username", "payments"];
            dispatch(isLoading({isLoading:true}))
            const resultLogin = await  window.Pi.authenticate(scopes, onIncompletePaymentFound)
            
            if( resultLogin ) {
                const loginUser = await signInUser(resultLogin);
                
                if (loginUser?.data.message.accessToken.length) {
                    await dispatch(accessToken({accessToken:loginUser?.data?.message.accessToken}));
                    const userInfor = await axiosClient.get("user/info", {
                        headers: {
                        'Authorization': `${loginUser?.data?.message.accessToken}`,
                        }
                    });
                  
                    if (userInfor) {
                        dispatch(setUser(userInfor.data));
                    }
                    dispatch(isLoading({isLoading:false}))
                } else {
                  dispatch(isLoading({isLoading:false}))
                }
                console.log(`Hi there! You're ready to make payments!`);
                dispatch(isLoading({isLoading:false}))
                toastSuccess(null, <Text style={{justifyContent: 'center'}}><Translate>Login successfully</Translate></Text>)
            } else {
              toastError('Error', <Text style={{justifyContent: 'center'}}><Translate>Somethig went wrong</Translate></Text>)
              dispatch(isLoading({isLoading:false}))
            }
          } catch (error) {
            dispatch(isLoading({isLoading:false}))
          }
    };
    // core data payment
    PaymentCore(signature, token)
    const dataPayment = GetDataPayment()
    const details = dataPayment?.details
    
    function convertDate(date: any) {
        if (date) {
          const today = new Date(date)
          const dd = String(today.getDate()).padStart(2, '0')
          const mm = String(today.getMonth() + 1).padStart(2, '0')
          const yyyy = today.getFullYear()
          return (
            <CsTextRight bold>{dd}/{mm}/{yyyy}</CsTextRight>
          )
        }
        return <Skeleton width={60} />
    }
    const { handlePayment, pendingPayment } = usePayment(signature, token) 
    return (
        <PageFullWidth>
            <CsContainer>
                {  userData === null || userData === undefined ? 
                    <CsButton 
                        onClick={signIn} 
                        disabled={loading}
                        endIcon={loading ? <AutoRenewIcon style={{margin: 0}} spin color="textDisabled"/> :  <Translate>Login</Translate>}
                    />
                :
                    <CsWrapContainer>
                        <Flex width="100%" flexDirection="column" mb="30px">
                            <CsHeading><Translate>Invoice</Translate> #{details?.invoiceNumber}</CsHeading>
                            <WContent>
                                <CsContentInfo>
                                    <Row>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <Fragment>
                                                { details?.logoUrl &&
                                                    <Image width={59} height={57} src={details?.logoUrl} alt='' />
                                                }
                                            </Fragment>
                                        }
                                    </Row>
                                    <Row mt="30px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft><Translate>Bill From</Translate></CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.billFrom}</CsTextRight>
                                        }
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft><Translate>Bill To</Translate></CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.billTo}</CsTextRight>
                                        }
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft><Translate>Issue Date</Translate></CsTextLeft>
                                        {convertDate(details?.issueDate)}
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft><Translate>Due Date</Translate></CsTextLeft>
                                        {convertDate(details?.dueDate)}
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft><Translate>Payment Terms</Translate></CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.paymentTerms}</CsTextRight>
                                        }
                                        
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft><Translate>PO Number</Translate></CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.poNumber}</CsTextRight>
                                        }
                                        
                                    </Row>
                                </CsContentInfo>
                                <CsContentBill>
                                    <CsRowth>
                                        <ColFirstth width="20%"><Translate>item</Translate></ColFirstth>
                                        <Colth width="20%"><Translate>quantity</Translate></Colth>
                                        <Colth width="20%"><Translate>unit price</Translate></Colth>
                                        <Colth width="20%"><Translate>total</Translate></Colth>
                                    </CsRowth>
                                    {details?.items.map((item) => {
                                        return(
                                            <CsRow>
                                            <ColFirst width="20%"><Translate>{item?.name}</Translate></ColFirst>
                                            <Col width="20%"><Translate>{item?.quantity}</Translate></Col>
                                            <Col width="20%">{item?.price && (item?.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</Col>
                                            <Col width="20%">{((item?.quantity) &&(item?.price)) && ((item?.quantity)*(item?.price)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</Col>
                                        </CsRow>
                                        )
                                    })}

                                </CsContentBill>
                                <CsContentInfo>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft><Translate>Subtotal</Translate></CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.subTotal && details?.subTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</CsTextRight>
                                        }
                                    </Row>
                                    { ( Number(details?.tax) > 0 && items?.isLoading === false ) &&
                                         <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft><Translate>Tax:</Translate> ({details?.tax} {details?.taxType === 1 ? "%" : "Pi"})</CsTextLeft>
                                            <CsTextRight bold>{details?.taxType === 1 ? <>
                                                {(details?.subTotal && details?.tax) && (details?.subTotal*details?.tax/100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})}
                                            </> : <>
                                                {details?.tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})}
                                            </> } Pi</CsTextRight>
                                        </Row>
                                    }
                                    {( Number(details?.discount) > 0 && items?.isLoading === false ) &&
                                         <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft><Translate>Discount:</Translate> ({details?.discount} {details?.discountType === 1 ? "%" : "Pi"})</CsTextLeft>
                                            <CsTextRight bold>{details?.discountType === 1 ? 
                                            <>
                                                {(details?.subTotal && details?.discount && details?.tax) && (details?.discount*(details?.subTotal + details?.tax)/100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})}
                                            </> : 
                                            <>
                                                {details?.discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})}
                                            </>
                                            } Pi</CsTextRight>
                                        </Row>
                                    }
                                    
                                    { ( Number(details?.shipping) > 0 && items?.isLoading === false ) &&
                                         <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft><Translate>Shipping</Translate></CsTextLeft>
                                            <CsTextRight bold>{details?.shipping && details?.shipping.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</CsTextRight>
                                        </Row>
                                    }
 
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>Total</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.total && details?.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</CsTextRight>
                                        }
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft><Translate>Allowances</Translate></CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>-{details?.amountPaid && details?.amountPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</CsTextRight>
                                        }
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>Amount Due</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.amountDue && details?.amountDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</CsTextRight>
                                        }
                                    </Row>
                                </CsContentInfo>
                            </WContent>
                            <Flex width="100%" justifyContent="center" mt="1rem">
                                <Button 
                                    width="100%" 
                                    height="50px"
                                    onClick={handlePayment}
                                    disabled={pendingPayment}
                                    endIcon={pendingPayment ? <AutoRenewIcon color="textDisable" spin/> : null}
                                >
                                    <Translate>Pay now</Translate>
                                </Button>
                            </Flex>
                        </Flex>
                        <Footer/>
                    </CsWrapContainer>
                }
                
            </CsContainer>
        </PageFullWidth>
    )
}

export default Payment

const CsContainer = styled(Flex)`
    width: 100%;
    flex-direction:column;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 0px 30px;
    @media only screen and (max-width: 600px) {
        padding: 0px 20px;
        min-height: 80vh;
    }
    @media only screen and (min-width: 768px) {
        max-width: 600px;
        min-height: 80vh;
    }
`
const CsButton = styled(Button)`
  width: 100%;
  height: 50px;
  background: #6b39f4;
  font-size: 12px;
  font-weight: 700;
  padding: 0px 8px;
`;

const CsContentInfo = styled.div``

const CsContentBill = styled.div`
    margin-top: 60px;
    padding-bottom: 10px;
    border-bottom: 1px solid #E2E8F0;
`

const ColFirstth = styled(Text)`
    font-size: 8px;
    color: #94A3B8;
    text-transform: uppercase;
    text-align: left;
`
const ColFirst = styled(Text)`
    font-size: 8px;
    color: #0F172A;
    text-align: left;
`

const Colth = styled(Text)`
    font-size: 8px;
    color: #94A3B8;
    text-transform: uppercase;
    text-align: right;
`
const Col = styled(Text)`
    font-size: 8px;
    color: #0F172A;
    text-align: right;
`
const CsRowth = styled(Row)`
    align-items: center;
    padding-bottom: 6px;
    justify-content: space-between;
    border-bottom: 1px solid #E2E8F0;
`
const CsRow = styled(Row)`
    justify-content: space-between;
    align-items: center;
    margin-top: 14px;
`
const CsHeading = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  color: #0F172A;
  text-align: center;
  font-weight: 700;
  font-size: 12px;
  padding: 12px 0;
`
const CsTextLeft = styled(Text)`
  font-weight: 500;
  font-size: 12px;
  color: #94A3B8;
  font-size: 12px;
`
const CsTextRight = styled(Text)`
  font-weight: 500;
  font-size: 12px;
  color: #0F172A;
  font-size: 12px;
`

const CsWrapContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  overflow: scroll;
  height: calc(100vh - 82px - 51px);
`

const WContent = styled.div`
    max-width: 100%;
    background: #F8F9FD;
    border-radius: 12px;
    padding: 26px 14px;
    margin-left: 20px;
    margin-right: 20px;
`