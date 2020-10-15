const jwt = require('jsonwebtoken')

const getToken =(user)=>{
    return jwt.sign(
        {
          email: user.email,
          userId: user._id
        },
        "Secret Key",
        {
            expiresIn: "20m"
        }
      );
}

exports.getToken = getToken