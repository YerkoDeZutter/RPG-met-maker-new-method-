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

    const characters = new new_Character(image);

    characters.character("main", aniFrames()[0], dirSprite);


    c.drawImage(tileMap, 0, 0);

    const mainCharImg = characters.charactermap.get("main");

    const mainChar = c.drawImage(mainCharImg, player.position.x, player.position.y);

    colitionBoxxes.forEach(Hbox=>{

      celitionDitec(player.position.x, (Hbox.space[0][0] * 32), player.position.y, (Hbox.space[0][2] * 32), (Hbox.space[0][1] * 32), (Hbox.space[0][3] * 32));

    })

    // celitionDitec(player.position.x, (0 * 32), player.position.y, (13 * 32), (16 * 32), (3 * 32));
    // celitionDitec(player.position.x, (14 * 32), player.position.y, (4 * 32), (12 * 32), (3 * 32));

    playerMove()

    dirXmov = 0;
    dirYmov = 0;

    // MakeGrid()

    requestAnimationFrame(update);
  }

  update()

})







// ----- FRAMES -----

let aniPicker;
let aniCount = 0;
let aniSpeed = ((aniFrameList[1].frames.length - 1) * 10);

function aniFrames() {
  if (aniCount <= aniSpeed) {
    aniCount++
  } else {
    aniCount = 0;
  }
  // console.log(Math.floor(aniCount/20));
  if (dirX != 0 || dirY != 0) {
    aniPicker = aniFrameList[1].frames[Math.floor(aniCount / 10)]
  } else {
    aniPicker = [0, 11]
  }
  return aniPicker
}









// ----- COLITION -----

let dirXmov = 0;
let dirYmov = 0;

function celitionDitec(x1, x2, y1, y2, hitSizeX, hitSizeY) {


  let x1mid = x1 + (50 / 2); //calculate middle of 1st object
  let y1mid = y1 + (50 / 2);

  let x2mid = x2 + (hitSizeX / 2); //calculate middle of 2nd object
  let y2mid = y2 + (hitSizeY / 2);




  // Math.abs(disX) < (50 + hitSizeX) / 2 && Math.abs(disY) < (50 + hitSizeY) / 2

  if (x2 <= (x1 + 64) && x1 <= (x2 + hitSizeX) && y2 <= (y1 + 64) && y1 <= (y2 + hitSizeY) - 32) {

    // c.fillStyle = "#255";
    // c.fillRect(250, 0, 100, 100);


    // Math.abs(disX) >= Math.abs(disY)
    // x2 - (x1 + 50) < y2 - (y1 + 50) || x1 - (x2 + hitSizeX) > y1 - (y2 + hitSizeY)

    if ((x2 - (x1 + 64) < 1 && x2 - (x1 + 64) > -10) || (x1 - (x2 + hitSizeX) < 1 && x1 - (x2 + hitSizeX) > -10)) {

      // c.fillStyle = "#255";
      // c.fillRect(250, 400, 100, 100);

      if (x1mid < x2mid) {
        dirXmov = 1;
      } else if (x1mid > x2mid) {
        dirXmov = -1;
      }
    }

    // Math.abs(disX) <= Math.abs(disY)

    if ((y2 - (y1 + 64) < 1 && y2 - (y1 + 64) > -10) || (y1 - (y2 + hitSizeY) < -32 && y1 - (y2 + hitSizeY) > -42)) {

      // c.fillStyle = "#fff255";
      // c.fillRect(150, 400, 100, 100);

      if (y1mid < y2mid) {
        dirYmov = 1;
      } else if (y1mid > y2mid) {
        dirYmov = -1;
      }

    }

  }

  // playerMove()

}





// ----- PLAYER MOVEMENT -----


function playerMove() {

  if (dirX != 0 || dirY != 0) {
    let movSpeed = 2;

    player.position.x += (dirX * movSpeed - dirXmov * movSpeed);
    player.position.y += (dirY * movSpeed - dirYmov * movSpeed);

    if (dirX != 0) {
      dirSprite = 10 + dirX
    } else {
      dirSprite = 9 + dirY
    }
  }

  if (player.position.x < 0 || player.position.x > 14 * 32) {
    dirX = 0;
  }
  if (player.position.y < 0 || player.position.y > 14 * 32) {
    dirY = 0;
  }

}









// ----- INPUTS -----

let dirX = 0;
let dirY = 0;
let dirSprite = 11;

document.addEventListener('keydown', event => {
  if (event.keyCode === 37 && player.position.x > 0) {
    dirX = -1;
  } else if (event.keyCode === 39 && player.position.x < 14 * 32) {
    dirX = 1;
  } else if (event.keyCode === 40 && player.position.y < 14 * 32) {
    dirY = 1;
  } else if (event.keyCode === 38 && player.position.y > 0) {
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




















function MakeGrid() {
  for (var i = 0; i < canvas.height / blockSize; i++) {
    for (var j = 0; j < canvas.width / blockSize; j++) {
      c.strokeRect(i * blockSize, j * blockSize, blockSize, blockSize);
      c.fillText("  " + i, i * blockSize, (j * blockSize - 20) + blockSize);
      c.fillText("  " + j, i * blockSize, (j * blockSize) + blockSize);
      c.font = "15px Arial";
    }
  }

}
