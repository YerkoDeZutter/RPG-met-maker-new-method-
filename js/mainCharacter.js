function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}



class new_Character {
  constructor(image) {
    this.image = image;
    this.charactermap = new Map();
  }

  character(name, Tx, Ty) {
    this.name = name;
    this.Tx = Tx * (blockSize * 2);
    this.Ty = Ty * (blockSize * 2);

    const characterblock = document.createElement("canvas")
    characterblock.width = blockSize * 2;
    characterblock.height = blockSize * 2;
    characterblock
      .getContext("2d")
      .drawImage(
        this.image,
        this.Tx, this.Ty,
        blockSize * 2, blockSize * 2,

        0, 0,
        blockSize * 2, blockSize * 2
      )
    this.charactermap.set(name, characterblock)
  }
}








setTimeout(loadImage('img/mainCharacter.png').then(image => {

  const characters = new new_Character(image);

  characters.character("main", 0, 11);

  // const mainChar = characters.charactermap.get("main");

  console.log(characters.charactermap);

  // c.drawImage(mainChar, 0, 0)

  update(characters)

}), 100)


function update(characters) {

  // this.Px = player.position.x;
  // this.Py = player.position.y;


  c.drawImage(tileMap, 0, 0);

  const mainChar = characters.charactermap.get("main");

  c.drawImage(mainChar, 0, 0);

  requestAnimationFrame(update(characters));
}



document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        player.position.x -= 10;
    } else if (event.keyCode === 39) {
        player.position.x += 10
    } else if (event.keyCode === 40) {
        player.position.y += 10
    } else if (event.keyCode === 38) {
        player.position.y -= 10
    }
});




const player = {
  position : {x : 0, y : 0}
}