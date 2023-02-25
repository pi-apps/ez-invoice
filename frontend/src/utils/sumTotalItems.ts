import { BigNumber } from 'bignumber.js';

export  const totalPrice = (fields) => {
  return fields?.reduce((sum, i) => {
    if(i.price === undefined || i.quantity === undefined){
      return 0
    } else{
      return (
        new BigNumber(sum).plus(new BigNumber(i.price).multipliedBy(i.quantity).toString()).toString()
      )
    }
  },0)
}