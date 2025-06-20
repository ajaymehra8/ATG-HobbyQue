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
}