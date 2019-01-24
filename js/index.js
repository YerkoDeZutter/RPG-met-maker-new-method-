// ----- LOAD SPRITE SET -----

function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}






// ----- TILE PLACES -----

let backgrounds = [{
    "name": "grass",
    "space": [
      [
        0, 16,
        0, 16
      ]
    ]
  },
  {
    "name": "stone",
    "space": [
      [
        3, 13,
        3, 13
      ],
      [
        0, 16,
        6, 10
      ],
      [
        6, 10,
        0, 13
      ]
    ]
  },
  {
    "name": "ege",
    "space": [
      [
        0, 16,
        13, 14
      ]
    ]
  },
  {
    "name": "water-ege",
    "space": [
      [
        0, 16,
        14, 15
      ]
    ]
  },
  {
    "name": "water",
    "space": [
      [
        0, 16,
        15, 16
      ]
    ]
  },
  {
    "name": "boat",
    "space": [
      [
        4, 5,
        14, 15
      ]
    ]
  }
]


const blockSize = 32;




// ----- CREAT FULL CANVAS -----


var canvas = document.querySelector("canvas");

canvas.width = (blockSize * 16);
canvas.height = (blockSize * 16);


var c = canvas.getContext("2d");

c.fillStyle = "#000";
c.fillRect(0, 0, canvas.width, canvas.height);





// ----- TILE CLASS -----

class new_tile {

  constructor(image) {
    this.image = image;
    this.tilemap = new Map();
  }


  // ----- CREAT TILE BLOCK -----

  tile(name, Tx, Ty) {
    this.name = name;
    this.Tx = Tx * blockSize;
    this.Ty = Ty * blockSize;

    const tileblock = document.createElement("canvas")
    tileblock.width = blockSize;
    tileblock.height = blockSize;
    tileblock
      .getContext("2d")
      .drawImage(
        this.image,
        this.Tx, this.Ty,
        blockSize, blockSize,

        0, 0,
        blockSize, blockSize
      )
    this.tilemap.set(name, tileblock)
  }

  // ----- CREAT OBJECT -----

  object(name, Tx, Ty, Tw, Th) {
    this.name = name;
    this.Tx = Tx * blockSize;
    this.Ty = Ty * blockSize;

    this.Tw = Tw * blockSize;
    this.Th = Th * blockSize;

    const tileblock = document.createElement("canvas")
    tileblock.width = this.Tw;
    tileblock.height = this.Th;
    tileblock
      .getContext("2d")
      .drawImage(
        this.image,
        this.Tx, this.Ty,
        this.Tw, this.Th,

        0, 0,
        this.Tw, this.Th
      )
    this.tilemap.set(name, tileblock)
  }

  // ----- DRAW TILE -----

  draw(name, context, x, y) {
    const tileblock = this.tilemap.get(name);
    context.drawImage(tileblock, x, y);
  }

  // ----- PREPARE TO DRAW TILE -----

  drawTile(name, context, x, y) {
    this.draw(name, context, x * blockSize, y * blockSize);
  }

}




// ----- START MAKING AND PLACING TILE'S -----

loadImage('img/RPG_path.png').then(image => {

  // ----- CREAT TILE BLOCKS -----

  let tiles = new new_tile(image);

  tiles.tile("grass", 1, 11);
  tiles.tile("stone", 1, 1);
  tiles.tile("ege", 1, 12);
  tiles.tile("water-ege", 1, 13);
  tiles.tile("water", 3, 10);
  tiles.object("boat", 0, 14, 4, 2);

  // ----- START PLACING TILE'S -----

  backgrounds.forEach(bg => {
    drawTiles(bg, c, tiles)
  })
})







// ----- TILE PER TILE PLACEMENT -----

function drawTiles(background, context, tiles) {
  background.space.forEach(([x1, x2, y1, y2]) => {
    for (var x = x1; x < x2; x++) {
      for (var y = y1; y < y2; y++) {
        tiles.drawTile(background.name, context, x, y);
      }
    }
  })
}
