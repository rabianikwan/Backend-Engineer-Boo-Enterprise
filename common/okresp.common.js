const ErrorResp = (code, status, msg) => {
    return {
        code,
        status,
        error: msg
    };
};

const OkResp = (msg, data) => {
    return {
        data,
        message: msg
    };
};

module.exports = {
    ErrorResp,
    OkResp
};