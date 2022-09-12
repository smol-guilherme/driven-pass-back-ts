import { stripHtml } from "string-strip-html";
export default function clearData(req, res, next) {
    var data = [req.headers, req.params, req.query, req.body];
    for (var i = 0; i < data.length; i++) {
        for (var param in data[i]) {
            if (typeof data[i][param] === "string") {
                data[i][param] = stripHtml(data[i][param]).result.trim();
            }
        }
    }
    next();
}
;
