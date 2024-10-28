import api from "../service/axios"
import userEndPoints from "../service/endPoints/userEndPoints"


export const login=async(email:string,password:string):Promise<any>=> await api.post(userEndPoints.login,{email,password})

export const userRegister=async(userName:string,email:string,password:string,confirmPassword:string):Promise<any>=> await api.post(userEndPoints.register,{userName,email,password,confirmPassword})

export const logout=async():Promise<any>=>await api.post(userEndPoints.logout)

export const tokenVerification=async():Promise<any>=>await api.get(userEndPoints.tokenVerification)

export const getCategoary=async():Promise<any>=>await api.get(userEndPoints.getCateogary)

export const getProduct=async(id:any):Promise<any>=>await api.get(`${userEndPoints.getProduct}?id=${id}`)

export const getProducts=async():Promise<any>=>await api.get(userEndPoints.getProducts)

export const addCart=async(id:string):Promise<any>=>await api.post(userEndPoints.addCart,{id})

export const getCart=async():Promise<any>=>await api.get(userEndPoints.getCart)

export const getProfileData=async():Promise<any>=>await api.get(userEndPoints.getProfileData)

export const removeCart=async(id:string):Promise<any>=>await api.put(userEndPoints.removeCart,{id})



