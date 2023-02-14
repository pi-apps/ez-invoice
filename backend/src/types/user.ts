import { ObjectId } from "mongodb";

export interface UserData {
  _id: ObjectId,
  firstName: string,
  lastName: string,
  username: string,
  uid: string,
  roles: Array<string>,
  accessToken: string,
  isActive: boolean
}
