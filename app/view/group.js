const {Router} = require("express");
const router = Router();
const Group = require("../model/Group");

router.get(
    "/",
    (req, res, next) => {
        Group.findAll()
            .then(result => res.json(result))
            .catch(next);
    }
);

router.post(
    "/",
    (req, res, next) => {
        Group.create(req.body)
            .then(result => res.json(result))
            .catch(next);
    }
)

module.exports = router;
