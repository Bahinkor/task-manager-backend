module.exports = (req, res, next) => {
    try {
        const {user} = req;
        const isAdmin = user.role === "ADMIN";

        if (!isAdmin) return res.status(403).json({message: "Not authorized"});

        next();

    } catch (err) {
        console.log(`is admin middleware, error: ${err}`);
        return res.status(500).json({
            message: err.message,
        });
    }
};