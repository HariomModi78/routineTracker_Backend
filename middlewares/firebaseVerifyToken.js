exports.verifyToken = (req, res, next)=>{
  const idToken = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  if (!idToken) return res.status(401).send("Unauthorized: No token provided");

  admin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken; // decodedToken contains uid, name, email
      next();
    })
    .catch(err => res.status(403).send("Invalid token"));
}