const CharBlock = blockSize * 2;



class new_Character {
  constructor(image) {
    this.image = image;
    this.charactermap = new Map();
  }

  character(name, Tx, Ty) {
    this.name = name;
    this.Tx = Tx * CharBlock;
    this.Ty = Ty * CharBlock;

    const characterblock = document.createElement("canvas")
    characterblock.width = CharBlock;
    characterblock.height = CharBlock;
    characterblock
      .getContext("2d")
      .drawImage(
        this.image,
        this.Tx, this.Ty,
        CharBlock, CharBlock,

        0, 0,
        CharBlock, CharBlock
      )
    this.charactermap.set(name, characterblock)
  }
}







// ----- CHARACTER LOADER -----

loadImage('img/mainCharacter.png').then(image => {

  // let lastFrame = 0;

  function update(frame = 0) {

    // const deltaFrame = frame - lastFrame;
    // lastFrame = frame;

    // console.log(deltaFrame);

    if (dirX != 0 || dirY != 0) {
      player.position.x += dirX * 2;
      player.position.y += dirY * 2;
    }

    const characters = new new_Character(image);

    characters.character("main", aniFrames()[0], dirSprite);


    c.drawImage(tileMap, 0, 0);

    const mainChar = characters.charactermap.get("main");

    c.drawImage(mainChar, player.position.x, player.position.y);

    requestAnimationFrame(update);
  }

  update()

})







// ----- FRAMES -----

let aniPicker;
let aniCount = 0;
let aniSpeed = ((aniFrameList[1].frames.length - 1) * 10);

function aniFrames() {
  if(aniCount <= aniSpeed){
    aniCount++
  } else {
    aniCount = 0;
  }
  // console.log(Math.floor(aniCount/20));
  if (dirX != 0 || dirY != 0) {
    aniPicker = aniFrameList[1].frames[Math.floor(aniCount/10)]
  } else {
    aniPicker = [0, 11]
  }
  return aniPicker
}









// ----- INPUTS -----

let dirX = 0;
let dirY = 0;
let dirSprite = 11;

document.addEventListener('keydown', event => {
  if (event.keyCode === 37) {
    dirX = -1;
    dirSprite = 9;
  } else if (event.keyCode === 39) {
    dirX = 1;
    dirSprite = 11;
  } else if (event.keyCode === 40) {
    dirY = 1;
    dirSprite = 10;
  } else if (event.keyCode === 38) {
    dirY = -1;
    dirSprite = 8;
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
