function sendSuccess(res, message, data, statusCode = 200) {
    return res.status(statusCode).json({ success: true, message, data });
}
function ok(res, data, meta) {
    if (meta)
        return res.json({ success: true, message: "OK", data, meta });
    return res.json({ success: true, message: "OK", data });
}
function created(res, data) {
    return res.status(201).json({ success: true, message: "Created", data });
}
function noContent(res) {
    return res.status(204).send();
}
module.exports = {
  created,
  noContent,
  ok,
  sendSuccess
};
