export const requireRole = (rolesPermitidos) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).send({
                message: "No autenticado"
            });
        }

        // si viene un solo rol, lo convertimos en array
        const roles = Array.isArray(rolesPermitidos)
            ? rolesPermitidos
            : [rolesPermitidos];

        if (!roles.includes(req.user.role)) {
            return res.status(403).send({
                message: "No tenés permisos"
            });
        }

        next();
    };
};