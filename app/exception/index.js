module.exports = (err, req, res, next) => {

    console.log(err.message);

    res.status(500);
    res.json({
        message: err.message
    });


    next();
}
