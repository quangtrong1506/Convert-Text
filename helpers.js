const fetch = require('node-fetch');
const LIST_LANGUAGE = [
    { label: 'Afrikaans', code: 'af' },
    { label: 'Albanian', code: 'sq' },
    { label: 'Amharic', code: 'am' },
    { label: 'Arabic', code: 'ar' },
    { label: 'Armenian', code: 'hy' },
    { label: 'Assamese', code: 'as' },
    { label: 'Azerbaijani (Latin)', code: 'az' },
    { label: 'Bangla', code: 'bn' },
    { label: 'Bashkir', code: 'ba' },
    { label: 'Basque', code: 'eu' },
    { label: 'Bhojpuri', code: 'bho' },
    { label: 'Bodo', code: 'brx' },
    { label: 'Bosnian (Latin)', code: 'bs' },
    { label: 'Bulgarian', code: 'bg' },
    { label: 'Cantonese (Traditional)', code: 'yue' },
    { label: 'Catalan', code: 'ca' },
    { label: 'Chinese (Literary)', code: 'lzh' },
    { label: 'Chinese Simplified', code: 'zh-Hans' },
    { label: 'Chinese Traditional', code: 'zh-Hant' },
    { label: 'chiShona', code: 'sn' },
    { label: 'Croatian', code: 'hr' },
    { label: 'Czech', code: 'cs' },
    { label: 'Danish', code: 'da' },
    { label: 'Dari', code: 'prs' },
    { label: 'Divehi', code: 'dv' },
    { label: 'Dogri', code: 'doi' },
    { label: 'Dutch', code: 'nl' },
    { label: 'English', code: 'en' },
    { label: 'Estonian', code: 'et' },
    { label: 'Faroese', code: 'fo' },
    { label: 'Fijian', code: 'fj' },
    { label: 'Filipino', code: 'fil' },
    { label: 'Finnish', code: 'fi' },
    { label: 'French', code: 'fr' },
    { label: 'French (Canada)', code: 'fr-ca' },
    { label: 'Galician', code: 'gl' },
    { label: 'Georgian', code: 'ka' },
    { label: 'German', code: 'de' },
    { label: 'Greek', code: 'el' },
    { label: 'Gujarati', code: 'gu' },
    { label: 'Haitian Creole', code: 'ht' },
    { label: 'Hausa', code: 'ha' },
    { label: 'Hebrew', code: 'he' },
    { label: 'Hindi', code: 'hi' },
    { label: 'Hmong Daw (Latin)', code: 'mww' },
    { label: 'Hungarian', code: 'hu' },
    { label: 'Icelandic', code: 'is' },
    { label: 'Igbo', code: 'ig' },
    { label: 'Indonesian', code: 'id' },
    { label: 'Inuinnaqtun', code: 'ikt' },
    { label: 'Inuktitut', code: 'iu' },
    { label: 'Inuktitut (Latin)', code: 'iu-Latn' },
    { label: 'Irish', code: 'ga' },
    { label: 'Italian', code: 'it' },
    { label: 'Japanese', code: 'ja' },
    { label: 'Kannada', code: 'kn' },
    { label: 'Kashmiri', code: 'ks' },
    { label: 'Kazakh', code: 'kk' },
    { label: 'Khmer', code: 'km' },
    { label: 'Kinyarwanda', code: 'rw' },
    { label: 'Klingon', code: 'tlh-Latn' },
    { label: 'Klingon (plqaD)', code: 'tlh-Piqd' },
    { label: 'Konkani', code: 'gom' },
    { label: 'Korean', code: 'ko' },
    { label: 'Kurdish (Central)', code: 'ku' },
    { label: 'Kurdish (Northern)', code: 'kmr' },
    { label: 'Kyrgyz (Cyrillic)', code: 'ky' },
    { label: 'Lao', code: 'lo' },
    { label: 'Latvian', code: 'lv' },
    { label: 'Lithuanian', code: 'lt' },
    { label: 'Lingala', code: 'ln' },
    { label: 'Lower Sorbian', code: 'dsb' },
    { label: 'Luganda', code: 'lug' },
    { label: 'Macedonian', code: 'mk' },
    { label: 'Maithili', code: 'mai' },
    { label: 'Malagasy', code: 'mg' },
    { label: 'Malay (Latin)', code: 'ms' },
    { label: 'Malayalam', code: 'ml' },
    { label: 'Maltese', code: 'mt' },
    { label: 'Maori', code: 'mi' },
    { label: 'Marathi', code: 'mr' },
    { label: 'Mongolian (Cyrillic)', code: 'mn-Cyrl' },
    { label: 'Mongolian (Traditional)', code: 'mn-Mong' },
    { label: 'Myanmar', code: 'my' },
    { label: 'Nepali', code: 'ne' },
    { label: 'Norwegian', code: 'nb' },
    { label: 'Nyanja', code: 'nya' },
    { label: 'Odia', code: 'or' },
    { label: 'Pashto', code: 'ps' },
    { label: 'Persian', code: 'fa' },
    { label: 'Polish', code: 'pl' },
    { label: 'Portuguese (Brazil)', code: 'pt' },
    { label: 'Portuguese (Portugal)', code: 'pt-pt' },
    { label: 'Punjabi', code: 'pa' },
    { label: 'Queretaro Otomi', code: 'otq' },
    { label: 'Romanian', code: 'ro' },
    { label: 'Rundi', code: 'run' },
    { label: 'Russian', code: 'ru' },
    { label: 'Samoan (Latin)', code: 'sm' },
    { label: 'Serbian (Cyrillic)', code: 'sr-Cyrl' },
    { label: 'Serbian (Latin)', code: 'sr-Latn' },
    { label: 'Sesotho', code: 'st' },
    { label: 'Sesotho sa Leboa', code: 'nso' },
    { label: 'Setswana', code: 'tn' },
    { label: 'Sindhi', code: 'sd' },
    { label: 'Sinhala', code: 'si' },
    { label: 'Slovak', code: 'sk' },
    { label: 'Slovenian', code: 'sl' },
    { label: 'Somali (Arabic)', code: 'so' },
    { label: 'Spanish', code: 'es' },
    { label: 'Swahili (Latin)', code: 'sw' },
    { label: 'Swedish', code: 'sv' },
    { label: 'Tahitian', code: 'ty' },
    { label: 'Tamil', code: 'ta' },
    { label: 'Tatar (Latin)', code: 'tt' },
    { label: 'Telugu', code: 'te' },
    { label: 'Thai', code: 'th' },
    { label: 'Tibetan', code: 'bo' },
    { label: 'Tigrinya', code: 'ti' },
    { label: 'Tongan', code: 'to' },
    { label: 'Turkish', code: 'tr' },
    { label: 'Turkmen (Latin)', code: 'tk' },
    { label: 'Ukrainian', code: 'uk' },
    { label: 'Upper Sorbian', code: 'hsb' },
    { label: 'Urdu', code: 'ur' },
    { label: 'Uyghur (Arabic)', code: 'ug' },
    { label: 'Uzbek (Latin)', code: 'uz' },
    { label: 'Vietnamese', code: 'vi' },
    { label: 'Welsh', code: 'cy' },
    { label: 'Xhosa', code: 'xh' },
    { label: 'Yoruba', code: 'yo' },
    { label: 'Yucatec Maya', code: 'yua' },
    { label: 'Zulu', code: 'zu' },
];
const QUICK_PICK_ITEM = [
    {
        label: 'camelCase                                                       ',
        description: 'EG: Visual Studio Code   ⇒   visualStudioCode',
        picked: true,
    },
    {
        label: 'PascalCase                                                       ',
        description: 'EG: Visual Studio Code   ⇒   VisualStudioCode',
    },
    {
        label: 'CONSTANT                                                      ',
        description: 'EG: Visual Studio Code   ⇒   VISUAL_STUDIO_CODE',
    },
    {
        label: 'underscore                                                      ',
        description: 'EG: Visual Studio Code   ⇒   visual_studio_code',
    },
    {
        label: 'Dash                                                                ',
        description: 'EG: Visual Studio Code   ⇒   Visual-Studio-Code',
    },
    {
        label: 'UPPERCASE                                                     ',
        description: 'EG: Visual Studio Code   ⇒   VISUAL STUDIO CODE',
    },
    {
        label: 'lowercase                                                        ',
        description: 'EG: Visual Studio Code   ⇒   visual studio code',
    },
    {
        label: 'Delete special characters                                ',
        description: 'EG: Visual-Studio-Code   ⇒   VisualStudioCode',
    },
    {
        label: 'Beautify text                                                    ',
        description: 'EG: Visual   Studio Code ⇒  Visual Studio Code',
    },
    {
        label: 'Remove Vietnamese characters                      ',
        description: 'EG: Việt Nam ⇒ Viet Nam',
    },
    {
        label: 'Translate: Vietnamese ⇒ English',
        description: '',
    },
    {
        label: 'Translate: English ⇒ Vietnamese',
        description: '',
    },
    {
        label: 'Translate: Many Languages',
        description: '',
    },
];
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
module.exports = {
    LIST_LANGUAGE,
    QUICK_PICK_ITEM,
    cleanText,
    removeVietnameseCharacters,
    translateAPI,
};
