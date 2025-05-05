const path = require('path');
const replaceColor = require('replace-color');

replaceColor({
  image: path.resolve(__dirname, '../assets/images/modifiedAAA.png'),
  colors: {
    type: 'hex',
    targetColor: '#20211E',
    replaceColor: '#4E5562'
  }

  /*4E5562*/
}).then((jimpObject) => {
  jimpObject.write(path.resolve(__dirname, '../assets/images/modified.png'));
}).catch(console.error);
