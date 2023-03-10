import { Router } from "express";
import { AuthenUser } from "../services/authen";
import platformAPIClient from "../services/platformAPIClient";
import UsersModel from "../models/users";

export default function mountUserEndpoints(router: Router) {
    // handle the user auth accordingly
    router.post('/signin', async (req, res) => {
        const auth = req.body.authResult;
        try {
            // Verify the user's access token with the /me endpoint:
            const me = await platformAPIClient.get(`/v2/me`, { headers: { 'Authorization': `Bearer ${auth.accessToken}` } });
        } catch (err) {
            console.log(err);
            return res.status(401).json({ error: "Invalid access token" })
        }

        let currentUser:any = await UsersModel.findOne({ uid: auth.user.uid });

        if (currentUser) {
            await UsersModel.updateOne({
                _id: currentUser._id
            }, {
                $set: {
                    accessToken: auth.accessToken,
                }
            });
            currentUser = await UsersModel.findOne({ uid: auth.user.uid });
        } else {
            const insertResult = new UsersModel({
                username: auth.user.username,
                uid: auth.user.uid,
                roles: auth.user.roles,
                accessToken: auth.accessToken
            });
            await insertResult.save();

            currentUser = await UsersModel.findOne(insertResult._id);
        }
        return res.status(200).json({ message: currentUser });
    });

    // handle the user auth accordingly
    router.post('/signout', async (req, res) => {
        const userInfo = await AuthenUser(req.headers.authorization);
        if (!userInfo) {
            return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
        }
        const userId = userInfo.uid;
        await UsersModel.updateOne(
            { uid: userId },
            {
                $set: {
                    accessToken: null,
                }
            }
        );
        return res.status(200).json({ message: "User signed out" });
    });

    // Get user
    router.get('/info', async (req, res) => {
        try {
            const userInfo = await AuthenUser(req.headers.authorization);
            if (!userInfo) {
                return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
            }
            const userId = userInfo.uid;
            const user = await UsersModel.findOne({ uid: userId });
            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'internal_error', message: "Internal error" });
        }
    });

    // Update user
    router.post('/update', async (req, res) => {
        try {
            const userInfo = await AuthenUser(req.headers.authorization);
            if (!userInfo) {
                return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
            }
            const user = userInfo;
            const data = req.body;
            // if (data.firstName === undefined || data.lastName === undefined || data.email === undefined || data.language === undefined) {
            //     return res.status(400).json({ error: 'bad_request', message: "Bad request" });
            // }
            const result = await UsersModel.findOneAndUpdate(
                { uid: user.uid },
                {
                    $set: {
                        "firstName": data.firstName,
                        "lastName": data.lastName,
                        "email": data.email,
                        "language": data.language,
                        "isActive": true
                    }
                },
                { new: true },
            )
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'internal_error', message: "Internal error" });
        }
    });
}
