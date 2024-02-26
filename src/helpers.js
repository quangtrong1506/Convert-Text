const fetch = require('node-fetch');

const removeVietnameseCharacters = (str) => {
    // remove accents
    var from =
            'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷÀÁÃẢẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆĐÙÚỦŨỤƯỪỨỬỮỰÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÌÍỈĨỊÄËÏÎÖÜÛÑÇÝỲỸỴỶ',
        to =
            'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyyAAAAAAAAAAAAAAAAAEEEEEEEEEEEDUUUUUUUUUUUOOOOOOOOOOOOOOOOOIIIIIAEIIOUUNCYYYYY';
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(RegExp(from[i], 'gi'), to[i]);
    }
    str = str
        .trim()
        .replace(/[^A-Za-z0-9\s]/g, '-')
        .replace(/-+/g, '-');
    return str;
};
const cleanText = (text) => {
    text = text.replace(/[^A-Za-z0-9]/g, ' ').trim();
    while (text.match(/  /)) {
        text = text.replaceAll('  ', ' ');
    }
    return text;
};
const cleanWhiteSpace = (text) => {
    while (text.match(/  /)) {
        text = text.replaceAll('  ', ' ').trim();
    }
    return text;
};
const translateAPI = async (
    options = {
        Text: 'Hello World',
        from: 'en',
        to: 'vi',
    }
) => {
    const myHeaders = {
        'Ocp-Apim-Subscription-Key': '63a9e9fdfaae40ca9fb5f816c4f3d540',
        'Ocp-Apim-Subscription-Region': 'southeastasia',
        'Content-type': 'application/json',
    };
    const response = await fetch(
        'https://api-apc.cognitive.microsofttranslator.com/translate/' +
            `?api-version=3.0&from=${options.from}&to=${options.to}`,
        {
            headers: myHeaders,
            body: JSON.stringify([{ Text: options.Text }]),
            method: 'POST',
        }
    );
    const body = await response.json();
    return body;
};
const variableToString = (text) => {
    text = text.replace(/[A-Z]/g, (x) => ' ' + x[0].toUpperCase());
    return text;
};
module.exports = {
    cleanText,
    removeVietnameseCharacters,
    translateAPI,
    cleanWhiteSpace,
    variableToString,
};
