export function requireRole(requiredRoles = []) {
    return function(req, res, next) {
        if (!req.user) {
            return res.json({success: false, error: "Not authenticated"});
        }

        if (!requiredRoles.includes(req.user.role)) {
            return res.json({success: false, error: "Forbidden"});
        }

        next()
    }
}