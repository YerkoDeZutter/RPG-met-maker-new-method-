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





var tileMap = document.createElement("canvas");
tileMap.width = 16 * 32;
tileMap.height = 16 * 32;





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
    context.getContext("2d").drawImage(tileblock, x, y);
    MakeDrawMap(context)
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
  tiles.tile("water", 3, 10);
  tiles.object("boat", 0, 14, 4, 2);
  tiles.object("market", 12, 0, 2, 3);



  // ----- EGE'S -----
  tiles.tile("stone-grass_0", 1, 1);




  tiles.tile("stone-grass_41", 0, 1);
  tiles.tile("stone-grass_40", 0, 1);
  tiles.tile("stone-grass_9", 0, 1);

  tiles.tile("stone-grass_148", 2, 1);
  tiles.tile("stone-grass_144", 2, 1);
  tiles.tile("stone-grass_20", 2, 1);

  tiles.tile("stone-grass_7", 1, 0);
  tiles.tile("stone-grass_6", 1, 0);
  tiles.tile("stone-grass_3", 1, 0);

  tiles.tile("stone-grass_224", 1, 2);
  tiles.tile("stone-grass_192", 1, 2);
  tiles.tile("stone-grass_96", 1, 2);






  tiles.tile("stone-grass_47", 0, 0);
  tiles.tile("stone-grass_15", 0, 0);

  tiles.tile("stone-grass_151", 2, 0);
  tiles.tile("stone-grass_23", 2, 0);

  tiles.tile("stone-grass_233", 0, 2);

  tiles.tile("stone-grass_244", 2, 2);


  tiles.tile("stone-grass_128", 0, 3);
  tiles.tile("stone-grass_32", 1, 3);
  tiles.tile("stone-grass_4", 0, 4);
  tiles.tile("stone-grass_1", 1, 4);

  tiles.object("water-grass_6", 1, 12, 1, 2);
  tiles.object("water-grass_7", 1, 12, 1, 2);
  tiles.object("water-grass_3", 1, 12, 1, 2);


  tiles.object("water-grass_0", 3, 10, 1, 1);

  // const neighborhood = [
  //   [-1, -1], [0, -1], [1, -1],
  //   [-1, 0],           [1, 0],
  //   [-1, 1],  [0, 1],  [1, 1]
  // ];

  // ----- START PLACING TILE'S -----

  backgrounds.forEach(bg => {
    drawTiles(bg, tileMap, tiles)
  })
})







// ----- TILE PER TILE PLACEMENT -----

function drawTiles(background, context, tiles) {
  if (background.overlay == true) {
    var curMatrix = creatMatrix(16, 16);

    background.space.forEach(([x1, x2, y1, y2]) => {
      for (var x = x1; x < x2; x++) {
        for (var y = y1; y < y2; y++) {
          curMatrix[y][x] = 1;
          tiles.drawTile(background.name, context, x, y);
        }
      }
      makeEge(background.name, context, tiles, [x1, x2, y1, y2], curMatrix)
    })
    tiles.egemap.set(background.name, curMatrix)
    // console.log(tiles.egemap);

  } else {

    background.space.forEach(([x1, x2, y1, y2]) => {
      for (var x = x1; x < x2; x++) {
        for (var y = y1; y < y2; y++) {
          tiles.drawTile(background.name, context, x, y);
        }
      }
    })
  }
}



function creatMatrix(x, y) {
  let matrix = [];
  while (y--) {
    matrix.push(new Array(x).fill(0))
  }
  return matrix
}






const neighborhood = [
  [-1, -1],[0, -1],[1, -1],
  [-1, 0],         [1, 0],
  [-1, 1],[0, 1],[1, 1]
];


function makeEge(type, context, tiles, [x1, x2, y1, y2], curMatrix) {
  let egeNum = 0;
  let neighbor = 1;
  for (var x = x1; x < x2; x++) {
    for (var y = y1; y < y2; y++) {
      for (var i = 0; i < neighborhood.length; i++) {
        let curNeighborY = y + neighborhood[i][1];
        let curNeighborX = x + neighborhood[i][0];
        if (curNeighborY >= 0 && curNeighborX >= 0 && curNeighborY <= 16 && curNeighborX <= 16 && typeof curMatrix[curNeighborY] !== 'undefined') {
          if (curMatrix[y][x] == 1 && curMatrix[curNeighborY][curNeighborX] == 0) {

            egeNum = egeNum + neighbor;

            // console.log(egeNum);

          }
        }
        neighbor = neighbor * 2;
      }
      if (egeNum != 0) {
        // console.log(egeNum);
        let curName = type + "-grass_" + egeNum;
        tiles.drawTile(curName, context, x, y);
      }
      egeNum = 0;
      neighbor = 1;
    }
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

setTimeout(MakeGrid, 100);


function MakeDrawMap(context) {
  // c.drawImage(context, 0, 0)
}


// setTimeout(MakeDrawMap, 1000);
