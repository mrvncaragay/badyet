exports.get404Page = (req, res) => {
    res.status(404);
    res.render('layouts/page404.ejs');
};