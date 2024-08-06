const { validateToken } =  require("../services/authentication.js");

function checkForAuth() {
  return (req, res, next) => {
    const tokenValue = req.headers["x-auth-token"];
    if (!tokenValue) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    try {
      const userPayload = validateToken(tokenValue);
      req.user = userPayload;
    } catch (error) {
      return res.status(401).json({ message: error });
    }

    return next();
  };
}

module.exports = { checkForAuth };
