const QUICK_PICK_ITEM = [
    {
        label: 'camelCase                                                       ',
        description: 'EG: Visual Studio Code > visualStudioCode',
        picked: true,
    },
    {
        label: 'PascalCase                                                       ',
        description: 'EG: Visual Studio Code > VisualStudioCode',
    },
    {
        label: 'CONSTANT                                                      ',
        description: 'EG: Visual Studio Code > VISUAL_STUDIO_CODE',
    },
    {
        label: 'underscore                                                      ',
        description: 'EG: Visual Studio Code > visual_studio_code',
    },
    {
        label: 'Dash                                                                  ',
        description: 'EG: Visual Studio Code > Visual-Studio-Code',
    },
    {
        label: 'UPPERCASE                                                     ',
        description: 'EG: Visual Studio Code > VISUAL STUDIO CODE',
    },
    {
        label: 'lowercase                                                        ',
        description: 'EG: Visual Studio Code > visual studio code',
    },
    {
        label: 'Delete special characters                                ',
        description: 'Visual-Studio-Code > VisualStudioCode',
    },
    {
        label: 'Beautify text                                                    ',
        description: 'Visual   Studio Code > Visual Studio Code',
    },
    {
        label: 'Remove Vietnamese characters                      ',
        description: 'EG: Việt Nam > Viet Nam',
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
const clearText = (text) => {
    text = text.replace(/[^A-Za-z0-9]/g, ' ').trim();
    while (text.match(/  /)) {
        text = text.replaceAll('  ', ' ');
    }

    return text;
};
module.exports = { clearText, removeVietnameseCharacters, QUICK_PICK_ITEM };
// employee manager > employeeManager
