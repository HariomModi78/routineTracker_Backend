const User = require("../models/User");
const admin = require("firebase-admin");
const UserProgress = require("../models/UserProgress");
exports.verifyUser = async (req,res)=>{
  try{
      const serviceAccount = {
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
        universe_domain:process.env.FIREBASE_UNIVERSE_DOMAIN
      };
      // Initialize Firebase Admin
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    const user = await User.create({
      email:req.user.email,
      userName:req.user.username,
      profilePicture:req.user.profilePic
    })
    await UserProgress.create({
      userId:user._id
    })
    res.status(201).json({message:"user succesfully created"});
  }catch(e){
    res.stats(500).json({error:e.message});
  }
}

exports.sayName = async (req,res)=>{
    try{
        res.json({message:"Hariom Modi"})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
