const { body, validationResult } = require("express-validator");
let usernames = [];
function getUsername(req, res) {
  res.json(usernames);
}
const createUsername = [
  body("username")
    .trim()
    .isLength({ min: 5, max: 15 })
    .withMessage("Username should contain min of 5 and max of 15 chars")
    .notEmpty()
    .withMessage("Username field is required"),
  body("username").custom((value) => {
    if (value.includes("&") || value.includes("*")) {
      throw new Error("Username should not contain & and *");
    }
    return true;
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      let { username } = req.body;
      console.log(req.body);
      usernames.push({ username });
      res.json({ status: "Added username successfully" });
    }
  },
];
module.exports = { getUsername, createUsername };
