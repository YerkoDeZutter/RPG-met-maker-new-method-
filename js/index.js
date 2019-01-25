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
    this.egemap = new Map();
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



  // ----- EGE'S -----

  tiles.tile("stone-grass_-1_0", 0, 1);
  tiles.tile("stone-grass_1_0", 2, 1);
  tiles.tile("stone-grass_0_-1", 0, 0);
  tiles.tile("stone-grass_0_1", 0, 2);


  tiles.tile("stone-grass_-1_-1", 0, 0);
  tiles.tile("stone-grass_1_-1", 2, 0);
  tiles.tile("stone-grass_-1_1", 0, 2);
  tiles.tile("stone-grass_1_1", 2, 2);


  tiles.tile("grass-stone_-1_-1", 0, 3);
  tiles.tile("grass-stone_1_-1", 1, 3);
  tiles.tile("grass-stone_-1_1", 0, 4);
  tiles.tile("grass-stone_1_1", 1, 4);

  // ----- START PLACING TILE'S -----

  backgrounds.forEach(bg => {
    drawTiles(bg, c, tiles)
  })
})







// ----- TILE PER TILE PLACEMENT -----

function drawTiles(background, context, tiles) {
  if (background.overlay == true) {
    var curMatrix = creatMatrix(16, 16);
  }
  background.space.forEach(([x1, x2, y1, y2]) => {
    for (var x = x1; x < x2; x++) {
      for (var y = y1; y < y2; y++) {
        if (background.overlay == true) {
          curMatrix[y][x] = 1;
        }
        tiles.drawTile(background.name, context, x, y);
      }
    }
  })
  if (background.overlay == true) {
    tiles.egemap.set(background.name, curMatrix)
    console.log(tiles.egemap);
  }
}




function creatMatrix(x, y) {
  let matrix = [];
  while (y--) {
    matrix.push(new Array(x).fill(0))
  }
  return matrix
}


// let curMatrix = creatMatrix(4, 10);









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

// setTimeout(MakeGrid, 100);
