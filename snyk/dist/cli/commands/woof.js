"use strict";
const woofs = {
    en: 'Woof!',
    he: ' !הב ',
    ru: ' Гав!',
    es: 'Guau!',
    cs: ' Haf!',
};
module.exports = function woof(...args0) {
    const args = [...args0];
    let options = {};
    if (typeof args[args.length - 1] === 'object') {
        options = args.pop();
    }
    const lang = options.language || 'en';
    console.log(`
    |         |
   /|         |\\
  | |         | |
  | |/-------\\| |
  \\             /
   |  \\     /  |
   | \\o/   \\o/ |
   |    | |    |
    \\/  | |  \\/
    |   | |   |
     \\  ( )  /
      \\_/ \\_/  /-----\\
        \\U/ --( ${woofs[lang]} )
               \\-----/
`);
};
//# sourceMappingURL=woof.js.map