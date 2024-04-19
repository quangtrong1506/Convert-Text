const translateText = require("free-google-translator-api");
const removeVietnameseCharacters = (str) => {
    // remove accents
    var from =
            "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷÀÁÃẢẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆĐÙÚỦŨỤƯỪỨỬỮỰÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÌÍỈĨỊÄËÏÎÖÜÛÑÇÝỲỸỴỶ",
        to =
            "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyyAAAAAAAAAAAAAAAAAEEEEEEEEEEEDUUUUUUUUUUUOOOOOOOOOOOOOOOOOIIIIIAEIIOUUNCYYYYY";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(RegExp(from[i], "gi"), to[i]);
    }
    str = str
        .trim()
        .replace(/[^A-Za-z0-9\s]/g, "-")
        .replace(/-+/g, "-");
    return str;
};
const cleanText = (text) => {
    text = text.replace(/[^A-Za-z0-9]/g, " ").trim();
    while (text.match(/  /)) {
        text = text.replaceAll("  ", " ");
    }
    return text;
};
const cleanText2 = (text) => {
    text = text.trim();
    while (text.match(/  /)) {
        text = text.replaceAll("  ", " ");
    }
    return text;
};
const cleanWhiteSpace = (text) => {
    while (text.match(/  /)) {
        text = text.replaceAll("  ", " ").trim();
    }
    return text;
};
const translateAPI = async (
    options = {
        Text: "Hello World",
        from: "en",
        to: "vi",
    }
) => {
    let response = await translateText(options.Text, options.from, options.to);
    return response;
};
const variableToString = (text) => {
    text = text.replace(/[A-Z]/g, (x) => {
        return " " + x.toUpperCase();
    });
    return text;
};
module.exports = {
    cleanText,
    removeVietnameseCharacters,
    translateAPI,
    cleanWhiteSpace,
    variableToString,
    cleanText2,
};
