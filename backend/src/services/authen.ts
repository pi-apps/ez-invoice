import platformAPIClient from "./platformAPIClient";
import UsersModel from "../models/users";
export const AuthenUser = async (accessToken: any) => {
    try {
        // Check in DB
        const user = await UsersModel.findOne({ accessToken: accessToken });
        if (!user) return null;
        // Verify the user's access token with the /me endpoint:
        const me = await platformAPIClient.get(`/v2/me`, { headers: { 'Authorization': `Bearer ${accessToken}` } });
        if (me.data) {
            return me.data;
        }
    } catch (err) {
        return null;
    }
}