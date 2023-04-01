import Jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import AppError from "../errors/AppError.js";
dotenv.config();

const verifyToken = (request, response, next) => {
    let token = request.headers["authorization"];

    if (!token) {
        throw new AppError(
            "Falha ao autenticar no sistema, autenticação não fornecida.",
            403,
            ["Token de autenticação não fornecido."]
        );
    }
    token = token.replace("Bearer ", "");

    Jsonwebtoken.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        request.user = null;
        request.userId = null;
        if (err) {
            throw new AppError("Falha ao autenticar no sistema!!", 403, [
                "Falha ao autenticar o token!!",
                err,
            ]);
        }
        request.user = decoded;
        request.userId = decoded.id;
        next();
    });
};

const logIn = (id) => {
    const oneDayInSeconds = 86400;
    const seconds = oneDayInSeconds * 90;
    const token =
        "Bearer " +
        Jsonwebtoken.sign(
            {
                id: id,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: seconds,
            }
        );
    return token;
};

const AuthenticationMiddleware = {
    verifyToken,
    logIn,
};

export default AuthenticationMiddleware;
