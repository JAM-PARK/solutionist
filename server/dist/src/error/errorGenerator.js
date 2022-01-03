"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEFAULT_HTTP_STATUS_MESSAGES = {
    400: 'insufficient information', ',: 401, 'invalid user,: 409, 'duplicate information': ,
    500: 'internal Server Error',
};
const errorGenerator = ({ msg = '', statusCode = 500, }) => {
    //인자로 들어오는 메세지와 상태 코드를 매핑
    const err = new Error(msg || DEFAULT_HTTP_STATUS_MESSAGES[statusCode]);
    err.statusCode = statusCode;
    throw err;
};
exports.default = errorGenerator;
//# sourceMappingURL=errorGenerator.js.map