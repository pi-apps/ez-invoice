import { Router } from "express";

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
      return res.status(401).json({error: "Invalid access token"}) 
    }

    let currentUser = await UsersModel.findOne({ uid: auth.user.uid });

    if (currentUser) {
      await UsersModel.updateOne({
        _id: currentUser._id
      }, {
        $set: {
          accessToken: auth.accessToken,
        }
      });
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

    req.session.currentUser = currentUser;

    return res.status(200).json({ message: "User signed in" });
  });

  // handle the user auth accordingly
  router.post('/signout', async (req, res) => {
    req.session.currentUser = null;
    return res.status(200).json({ message: "User signed out" });
  });

  // Get user
  router.get('/info', async (req, res) => {
    try {
      if (!req.session.currentUser) {
        return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
      }
  
      const userId = req.session.currentUser._id;
      const user = await UsersModel.findOne({ _id: userId });
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'internal_error', message: "Internal error" });
    }
  });

  // Update user
  router.post('/update', async (req, res) => {
    try {
      if (!req.session.currentUser) {
        return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
      }
  
      const user = req.session.currentUser;
      const data = req.body;
      
      const result = await UsersModel.findOneAndUpdate(
        { _id: user._id },
        { $set: {
          "firstName": data.firstName,
          "lastName": data.lastName,
          "email": data.email,
          "language": data.language
        } },
        { new: true },
      )
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'internal_error', message: "Internal error" });
    }
  });
}
