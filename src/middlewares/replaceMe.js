
function replaceMe(req, res, next) {
    try {
        if ((req.user && req.params.userId === 'me') || (req.user && req.user._id.toString() === req.params.userId) || (req.user && req.user.login === req.params.userId) ) {
            req.params.userId = req.user._id.toString();
            req.isCurrentUser = true;
        }
        next();
    } catch (e) {
        next(e);
    }
}

module.exports = replaceMe;