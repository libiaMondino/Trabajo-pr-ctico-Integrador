import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({
            message: "No se proporcionó token"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "CLAVE_SECRETA");
        req.user = decoded; // 
        next();
    } catch (error) {
        return res.status(403).send({
            message: "Token inválido"
        });
    }
};