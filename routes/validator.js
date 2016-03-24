
module.exports = function(req, res, next) {
    if (req.session.islogged) {
        console.log(req.session);
        next();
    } else {
        console.log("not Authorized");
        res.redirect('/users/login');
    }
};
