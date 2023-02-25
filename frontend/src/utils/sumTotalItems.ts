import BigNumber from "bignumber.js"

export const totalPrice = (fields) => {
    return fields.reduce((sum, i) => {
      if(i.price === undefined || i.quantity === undefined){
        return 0
      } else{
        return new BigNumber(sum).plus(i.price).multipliedBy(i.quantity).toString()
      }
    },0)
}