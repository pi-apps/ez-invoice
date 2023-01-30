
const isEmail = (val) =>
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
.test(val)
function isNumeric(str){
    return /^\d+$/.test(str);
}

export const rules = {
    email:{
        required:{
            value:true,
            message: 'Email is required',
        },
        minLength:{
            value:4,
            message:'Emails are between 4 and 160 characters in length'
        },
        maxLength:{
            value:160,
            message:'Emails are between 4 and 160 characters in length'
        },
        validate:{
            email: val=>isEmail(val) || "Please enter correct Email format"   
        }
    },
    fistname: {
        required:{
            value:true,
            message: 'Fistname is required',
        },
    },
    lastname: {
        required:{
            value:true,
            message: 'Lastname is required',
        },
    },
    language: {
        required:{
            value:true,
            message: 'Language is required',
        },
    },
}
