export const loginStart = ()=>({type:"LOGIN_START"})
export const loginSuccess = (data)=>({type:"LOGIN_SUCCESS" , payload:data})
export const loginFailure = ()=>({type:"LOGIN_FAILURE"})
export const LogOutStart = ()=>({type:"LOGOUT_SUCCESS"})