import api from "../service/axios"
import userEndPoints from "../service/endPoints/userEndPoints"


export const login=async(email:string,password:string):Promise<any>=> await api.post(userEndPoints.login,{email,password})

export const register=async(userName:string,email:string,password:string,confirmPassword:string):Promise<any>=> await api.post(userEndPoints.register,{userName,email,password,confirmPassword})

export const logout=async():Promise<any>=>await api.post(userEndPoints.logout)






