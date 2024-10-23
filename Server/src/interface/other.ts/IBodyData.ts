
export interface RegisterBodyData{
    userName:string,
    email:string,
    password:string,
    confirmPassword:string
}

export interface LoginBody{
    email:string,
    password:string
}

export interface LoginResponse{
    message:string,
    token:string
}