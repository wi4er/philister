const {Router} = require("express");
const router = Router();
const Element = require("../model/Element");

router.get(
    "/",
    (req, res, next) => {
        Element.findAll()
            .then(result => res.json(result))
            .catch(next);
    }
);

router.post(
    "/",
    (req, res, next) => {
        console.log(req.body);
        
        
        Element.create(
            req.body,
            {
                include: [Element.Property]
            }
        )
            .then(result => res.json(result))
            .catch(next);
    }
)

module.exports = router;
