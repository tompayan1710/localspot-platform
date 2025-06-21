const path = require('path');
const replaceColor = require('replace-color');

replaceColor({
  image: path.resolve(__dirname, '../assets/images/copieIcon.png'),
  colors: {
    type: 'hex',
    targetColor: '#1D1D1B',
    replaceColor: '#FFFFFF'
  }

  /*4E5562*/
}).then((jimpObject) => {
  jimpObject.write(path.resolve(__dirname, '../assets/images/modifiedfsf.png'));
}).catch(console.error);
