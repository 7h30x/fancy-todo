const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID;

module.exports = function (req,res, next) {
  const client = new OAuth2Client(CLIENT_ID);
  async function verify(token) {
    console.log('verifying')
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
    return payload;
  }
  let token = req.body.accessToken
  verify(token)
  .then(payload => {
    req.body.payload = payload;
    next();
  })
  .catch(error => {
    res.status(400).json({
      error
    })
  });
}
