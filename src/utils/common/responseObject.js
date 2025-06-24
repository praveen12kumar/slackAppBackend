// export const customErrorResponse = (error)=>{
//     return{
//         success: false,
//         err: 
//         message: error.message
//     }
// }

export const successResponse = (data, message)=>{
    return{
        success: true,
        data: data,
        message: message,
        err: {}
    }
}