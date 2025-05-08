const path = require('path');
const replaceColor = require('replace-color');

replaceColor({
  image: path.resolve(__dirname, '../assets/images/eyeicon.png'),
  colors: {
    type: 'hex',
    targetColor: '#5DA235',
    replaceColor: '#5D82EE'
  }

  /*4E5562*/
}).then((jimpObject) => {
  jimpObject.write(path.resolve(__dirname, '../assets/images/modified.png'));
}).catch(console.error);
