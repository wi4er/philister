const {Router} = require("express");
const router = Router();
const Property = require("../model/Property");
const Element = require("../model/Element");

router.get(
    "/",
    (req, res, next) => {
        Property.findAll()
            .then(result => res.json(result))
            .catch(next);
    }
);

router.post(
    "/",
    (req, res, next) => {
        Property.create(
            req.body,
            {}
        )
            .then(result => res.json(result))
            .catch(next);
    }
)

module.exports = router;
