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







// ----- CHARACTER LOADER -----

loadImage('img/mainCharacter.png').then(image => {

  function update() {
    if(dirX != 0 || dirY != 0){
     player.position.x += dirX*5;
     player.position.y += dirY*5;
    }

    const characters = new new_Character(image);

    characters.character("main", 0, 11);


    c.drawImage(tileMap, 0, 0);

    const mainChar = characters.charactermap.get("main");

    c.drawImage(mainChar, player.position.x, player.position.y);

    requestAnimationFrame(update);
  }

  update()

})









// ----- INPUTS -----

let dirX = 0;
let dirY = 0;

document.addEventListener('keydown', event => {
  if (event.keyCode === 37) {
    dirX = -1;
  } else if (event.keyCode === 39) {
    dirX = 1;
  } else if (event.keyCode === 40) {
    dirY = 1;
  } else if (event.keyCode === 38) {
    dirY = -1;
  }

});

document.addEventListener('keyup', event => {
  if (event.keyCode === 37) {
    dirX = 0;
  } else if (event.keyCode === 39) {
    dirX = 0;
  } else if (event.keyCode === 40) {
    dirY = 0;
  } else if (event.keyCode === 38) {
    dirY = 0;
  }

});




// ----- PLAYER SETUP -----

const player = {
  position: {
    x: 0,
    y: 0
  }
}
