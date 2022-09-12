export function handleError(error, req, res, next) {
    var _a, _b, _c;
    console.log(error);
    if (isJoiError(error)) {
        if (((_a = error === null || error === void 0 ? void 0 : error.details[0]) === null || _a === void 0 ? void 0 : _a.type) === "string.pattern.base")
            return res.status(422).send();
        if (((_b = error === null || error === void 0 ? void 0 : error.details[0]) === null || _b === void 0 ? void 0 : _b.type) === "any.only")
            return res.status(422).send();
        if (((_c = error === null || error === void 0 ? void 0 : error.details[0]) === null || _c === void 0 ? void 0 : _c.type) === "string.empty")
            return res.status(422).send();
    }
    if (error.type === "not_found_error")
        return res.status(404).send();
    if (error.type === "no_schema_error")
        return res.status(400).send();
    if (error.type === "registry_conflict")
        return res.status(409).send(error.message);
    if (error.type === "authentication_error")
        return res.status(401).send(error.message);
    res.status(500).send({ message: "server error, please try again later" });
}
function isJoiError(error) {
    if (Object.keys(error).includes("details"))
        return true;
    return false;
}
