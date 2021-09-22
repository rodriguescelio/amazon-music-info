const { getData } = require('../dist/index');

const init = async () => {
  console.log(await getData('https://music.amazon.com.br/albums/B09DGWQV2X'));
};

init();
