import "dotenv/config";
import jwt from "jsonwebtoken";
var J_SECRET = process.env.ENCRYPTION_SECRET;
export function emitToken(id) {
    return jwt.sign({ id: id }, J_SECRET, { expiresIn: "4h" });
}
export function validateToken(token) {
    var data = jwt.verify(token, J_SECRET);
    return data;
}
function isPreviousTokenExpired() {
    return "";
}
