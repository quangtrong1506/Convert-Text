"use strict";

const HTMLtoJSX = require("htmltojsx");
class JSXConvertor {
    convert(input) {
        let output;
        let converter = new HTMLtoJSX({
            createClass: false,
        });
        output = converter.convert(input);
        return output;
    }
}

module.exports = JSXConvertor;
