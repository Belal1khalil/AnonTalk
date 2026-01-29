export interface user  {
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    gender:string,
    phone:string,

}

export type userState = {
    token: null | string,
    userData : user | null;
    
}