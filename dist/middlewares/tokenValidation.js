import jwt from "jsonwebtoken";
import "dotenv/config";
var J_SECRET = process.env.ENCRYPTION_SECRET;
export function validateToken(req, res, next) {
    var authorization = req.headers.authorization;
    var token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Bearer ", "");
    if (!token)
        return res.status(401).send();
    jwt.verify(token, J_SECRET, function (error, decoded) {
        if (error !== null)
            throw { type: "authentication_error" };
        res.locals.id = decoded;
    });
    next();
}
function isPreviousTokenExpired() {
    return "";
}
