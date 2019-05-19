module.exports= (req, res, next) => {
    if(!req.session.isCurrentUserSignedIn) return res.redirect('/app/sign-in');

    next();
};