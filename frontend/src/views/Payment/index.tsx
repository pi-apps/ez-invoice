import { Text, Flex, Button, AutoRenewIcon, Skeleton, Image } from "@devfedeltalabs/pibridge_uikit";
import styled from "styled-components";
import Footer from 'components/Footer';
import Nav from 'react-bootstrap/Nav';
import Row from 'components/Layout/Row';
import PageFullWidth from "components/Layout/PageFullWidth"
import { useParams, useNavigate } from 'react-router-dom';
import { Translate } from "react-auto-translate";
import Header from 'components/Header';

import { getAccessToken, getUser } from "state/user";
import { GetAnInvoice } from "state/invoice";
import useToast from "hooks/useToast";
import { useDispatch } from "react-redux";
import { CsModalLogin } from "./CsModalLogin";
import { AppDispatch } from "state";
import { fetchLoading } from "state/invoice/actions";
import { setUser, isLoading, accessToken } from "state/user/actions";
import { axiosClient } from "config/htttp";
import { AuthResult, PaymentDTO } from "components/Menu/UserMenu/type";
import { GetDataPayment, PaymentCore } from "state/payment";
import { usePayment } from "./hook/usePayment";
import { fetchDataUser } from "state/payment/actions";
import { Fragment, useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { payment_text } from "translation/languages/payment_text";
import { paymentTranslate } from "translation/translateArrayObjects";

const Payment = () => {
    const  { signature } = useParams()
    const navigate = useNavigate();
    const items = GetAnInvoice();
    const { toastSuccess, toastError } = useToast()
    const userData = getUser()
    const [ tips, setTips ] = useState("0")
    const token = getAccessToken()
    // console.log('tokensdasdas', token)
    const dispatch = useDispatch<AppDispatch>();
    const [ isLoading, setLoading ] = useState(false)
    const onIncompletePaymentFound = (payment: PaymentDTO) => {
        console.log("onIncompletePaymentFound", payment);
        return axiosClient.post("/payments/incomplete", { payment });
    };
    const signInUser = async (authResult: AuthResult) => {
        return await axiosClient.post("/user/signin", { authResult });
    };
    const signIn = async () => {
        try {
            const scopes = ["username", "payments", "wallet_address"];
            setLoading(true)
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
                        const submitReqInvoiceId = await axiosClient.get(`payments/get-invoice-id/${signature}`, {
                            headers: {
                                'Authorization': loginUser?.data?.message.accessToken,
                            }
                        });
                        if(submitReqInvoiceId.status == 200){
                            await axiosClient.post('/payments/update-receiver', 
                                {
                                    "invoiceId": submitReqInvoiceId?.data,
                                    "signature": signature
                                }, 
                                {
                                    headers: {
                                        'Authorization': loginUser?.data?.message.accessToken,
                                    }
                                }
                            );
                        }
                        dispatch(setUser(userInfor.data));
                    }
                    setLoading(false)
                } else {
                    setLoading(false)
                }
                console.log(`Hi there! You're ready to make payments!`);
                setLoading(false)
                toastSuccess(null, <Text style={{justifyContent: 'center'}}><Translate>Login successfully</Translate></Text>)
            } else {
              toastError('Error', <Text style={{justifyContent: 'center'}}><Translate>Somethig went wrong</Translate></Text>)
              setLoading(false)
            }
          } catch (error) {
            setLoading(false)
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
    const { handlePayment, pendingPayment } = usePayment(signature, token, userData?.language, tips) 
    // for tips 
    const handleValueTips = (event: React.ChangeEvent<HTMLInputElement>) => {
        const evt = event.target.value
        if( Number(evt) < 0 ) {
            setTips("0")
        } else {
            setTips(event.target.value)
        }
        
    }
    const total = tips.length > 0 ? new BigNumber(details?.amountDue).plus(new BigNumber(tips)) : new BigNumber(details?.amountDue).plus(new BigNumber(0))
    const converTotal = new BigNumber(total).decimalPlaces(4,1) 
    const convertAmountPaid = new BigNumber(details?.amountPaid).decimalPlaces(4,1)

    const DataAb = getUser();
    const languageUserApi = DataAb?.language
   // Translate
   const [stateText, setStateText] = useState(payment_text);
   const requestTrans = async () => {
     try {
       const resData = await paymentTranslate(languageUserApi);
       setStateText(resData)
     } catch (error) {
       console.log(error)
     }
   }
   useEffect(() => {
     if (languageUserApi) {
       requestTrans();
     } else if (!languageUserApi) {
       setStateText(payment_text);
     }
   }, [languageUserApi]);

   const discoutAmount = new BigNumber(details?.discount).multipliedBy(new BigNumber(details?.subTotal)).dividedBy(100).toString()


    return (
        <PageFullWidth>
            <CsContainer>
                <Header/>
                {  userData === null || userData === undefined ? 
                    // <CsButton 
                    //     onClick={signIn} 
                    //     disabled={loading}
                    //     endIcon={loading ? <AutoRenewIcon style={{margin: 0}} spin color="textDisabled"/> :  <Translate>Login</Translate>}
                    // />
                    <CsModalLogin onSignIn={signIn} isLoading={isLoading}/>
                :
                    <CsWrapContainer>
                        <Flex width="100%" flexDirection="column" mb="30px">
                            <CsHeading>{stateText.text_invoice} #{details?.invoiceNumber}</CsHeading>
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
                                        <CsTextLeft>{stateText.text_bill_from}</CsTextLeft>
                                        <Flex width="60%" justifyContent="flex-end">
                                            { items?.isLoading ?
                                                <Skeleton width={60} />
                                            :
                                                <CsTextRight width="100%" textAlign="right" bold style={{wordBreak:"break-word"}}>{details?.billFrom}</CsTextRight>
                                            }
                                        </Flex>
                                        
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_bill_to}</CsTextLeft>
                                        <Flex width="60%" justifyContent="flex-end">
                                            { items?.isLoading ?
                                                <Skeleton width={60} />
                                            :
                                                <CsTextRight width="100%" textAlign="right" bold style={{wordBreak:"break-word"}}>{details?.billTo}</CsTextRight>
                                            }
                                        </Flex>
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_issue_date}</CsTextLeft>
                                        {convertDate(details?.issueDate)}
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_due_date}</CsTextLeft>
                                        {convertDate(details?.dueDate)}
                                    </Row>
                                    {/* <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_payment_terms}</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.paymentTerms}</CsTextRight>
                                        }
                                        
                                    </Row> */}
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_payment_terms}</CsTextLeft>
                                        <Flex width="60%" justifyContent="flex-end">
                                            { items?.isLoading ?
                                                <Skeleton width={60} />
                                            :
                                                <CsTextRight bold width="100%" textAlign="right" style={{wordBreak:"break-word"}}>{details?.paymentTerms}</CsTextRight>
                                            }
                                        </Flex>
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_po_number}</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.poNumber}</CsTextRight>
                                        }
                                        
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_notes}</CsTextLeft>
                                        <Flex width="60%" justifyContent="flex-end">
                                            { items?.isLoading ?
                                                <Skeleton width={60} />
                                            :
                                                <CsTextRight width="100%" textAlign="right" bold style={{wordBreak:"break-word"}} >{details?.notes}</CsTextRight>
                                            }
                                        </Flex>
                                       
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_terms}</CsTextLeft>
                                        <Flex width="60%" justifyContent="flex-end">
                                            { items?.isLoading ?
                                                <Skeleton width={60} />
                                            :
                                                <CsTextRight width="100%" textAlign="right" bold style={{wordBreak:"break-word"}} >{details?.terms}</CsTextRight>
                                            }
                                        </Flex>
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_shipto}</CsTextLeft>
                                        <Flex width="60%" justifyContent="flex-end">
                                            { items?.isLoading ?
                                                <Skeleton width={60} />
                                            :
                                                <CsTextRight width="100%" textAlign="right" bold style={{wordBreak:"break-word"}} >{details?.shipTo}</CsTextRight>
                                            }
                                        </Flex>
                                    </Row>
                                </CsContentInfo>
                                <CsContentBill>
                                    <CsRowth>
                                        <ColFirstth paddingRight="15px" width="50%">{stateText.text_item}</ColFirstth>
                                        <Colth width="10%">{stateText.text_quanlity}</Colth>
                                        <Colth width="20%">{stateText.text_unit_price}</Colth>
                                        <Colth width="20%">{stateText.text_total}</Colth>
                                    </CsRowth>
                                    {details?.items.map((item) => {
                                        const convertPrice = new BigNumber(item?.price).decimalPlaces(4,1)
                                        const convertTotal = new BigNumber((item?.quantity)*(item?.price)).decimalPlaces(4,1)
                                        return(
                                            <CsRow>
                                            <ColFirst paddingRight="15px" width="50%">{item?.name}</ColFirst>
                                            <Col width="10%">{item?.quantity}</Col>
                                            <Col width="20%">{Number(convertPrice.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</Col>
                                            <Col width="20%">{Number(convertTotal.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</Col>
                                        </CsRow>
                                        )
                                    })}

                                </CsContentBill>
                                <CsContentInfo>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_subtotal}</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.subTotal && details?.subTotal.toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</CsTextRight>
                                        }
                                    </Row>
                                    { ( Number(details?.tax) > 0 && items?.isLoading === false ) &&
                                         <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft>{stateText.text_tax}: ({details?.tax} {details?.taxType === 1 ? "%" : "PI"})</CsTextLeft>
                                            <CsTextRight bold>{details?.taxType === 1 ? <>
                                                {(details?.subTotal && details?.tax) && (details?.subTotal*details?.tax/100).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})}
                                            </> : <>
                                                {details?.tax.toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})}
                                            </> } PI</CsTextRight>
                                        </Row>
                                    }
                                    {( Number(details?.discount) > 0 && items?.isLoading === false ) &&
                                         <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft>{stateText.text_discount}: ({details?.discount} {details?.discountType === 1 ? "%" : "PI"})</CsTextLeft>
                                            <CsTextRight bold>{details?.discountType === 1 ? 
                                            <>
                                                {(details?.subTotal && details?.discount) && Number(discoutAmount).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})}
                                            </> : 
                                            <>
                                                {details?.discount.toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})}
                                            </>
                                            } PI</CsTextRight>
                                        </Row>
                                    }
                                    
                                    { ( Number(details?.shipping) > 0 && items?.isLoading === false ) &&
                                         <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft>{stateText.text_shipping}</CsTextLeft>
                                            <CsTextRight bold>{details?.shipping && details?.shipping.toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</CsTextRight>
                                        </Row>
                                    }
 
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_total}</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.total && details?.total.toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</CsTextRight>
                                        }
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_amount_paid}</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>-{ Number(convertAmountPaid.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</CsTextRight>
                                        }
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_amount_due}</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.amountDue && details?.amountDue.toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</CsTextRight>
                                        }
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_tips}</CsTextLeft>
                                        <Flex alignItems="center" style={{gap:"10px"}} justifyContent="flex-end" background="#F8F9FD">
                                            <CsInput
                                                placeholder="0.00"
                                                onChange={handleValueTips}
                                                type="number"
                                                value={tips}
                                            />
                                            <Text fontSize="12px">PI</Text>
                                        </Flex>
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_total_incl_tips}</CsTextLeft>
                                        <CsTextRight>{Number(converTotal.toString()).toLocaleString("en", { minimumFractionDigits: 4, maximumFractionDigits: 4})} PI </CsTextRight>
                                    </Row>
                                </CsContentInfo>
                            </WContent>
                            <Flex width="100%" justifyContent="center" mt="1rem" flexDirection="column">
                                <Button 
                                    width="100%" 
                                    height="50px"
                                    onClick={handlePayment}
                                    disabled={pendingPayment}
                                    endIcon={pendingPayment ? <AutoRenewIcon color="textDisable" spin/> : null}
                                >
                                    {stateText.text_pay_now}
                                </Button>
                                <Button 
                                    width="100%" 
                                    height="50px"
                                    onClick={()=> 
                                        navigate('/invoice')
                                    }
                                    mt="1rem"
                                >
                                    {stateText.text_back}
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

const CsInput = styled.input`
    width: 130px;
    border: none;
    outline:none;
    height: 32px;
    font-size: 12px;
    padding-left:12px;
    background-color: none;
`