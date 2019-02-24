//Check chapter 108 we use this alow users to access only when loged in
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "You must login" });
  }
  next();
};
