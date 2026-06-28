import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("Authorization:", authHeader);

    if (!authHeader) {
        return res.status(401).send({
            message: "No se proporcionó token"
        });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token:", token);

    try {
        const decoded = jwt.verify(token, "CLAVE_SECRETA");
        console.log("Token decodificado:", decoded);

        req.user = decoded; // 
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).send({
            message: "Token inválido"
        });
    }
};