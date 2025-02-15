"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random = (len) => {
    let options = "qwertyuiop1234567890";
    let length = options.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += options[Math.floor(Math.random() * length)];
    }
    return ans;
};
exports.default = random;
