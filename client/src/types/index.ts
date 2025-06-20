export interface UserType{
_id:string,
image:string,
name:string,
email:string,
};
export interface HobbyType{
    _id:string,
    user:UserType,
    name:string,
    createdAt?:Date
};
export interface SponserType{
    _id:number,
    name:string,
    link:string,
    image:string,
}