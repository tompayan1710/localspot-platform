const path = require('path');
const replaceColor = require('replace-color');

replaceColor({
  image: path.resolve(__dirname, '../assets/images/trashicon.png'),
  colors: {
    type: 'hex',
    targetColor: '#ED332A',
    replaceColor: '#000000'
  }

  /*4E5562*/
}).then((jimpObject) => {
  jimpObject.write(path.resolve(__dirname, '../assets/images/modified.png'));
}).catch(console.error);
