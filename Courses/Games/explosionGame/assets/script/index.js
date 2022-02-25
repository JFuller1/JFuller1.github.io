
// Grid Creation

const gridCon = document.getElementById('grid');
const resetButton = document.getElementById('reset');

const row = document.createElement('div');
row.classList.add('row');
const rows = [];
const tile = document.createElement('div');
tile.classList.add('tile');

const wall = document.createElement('div');
wall.classList.add('wall');

const brick = document.createElement('div');
brick.classList.add('brick');
let bricksLeft = [];

const startShoot = document.createElement('div');

const explosion = document.createElement('div');
explosion.classList.add('explosion');

let isWall = false;
let isBrick = false;
let isStartShoot = false;

let lvlCount = 1;
let levels = 'level' + lvlCount;

const inventory = document.getElementById('inventory');
let piece = '';
let clicked = false;
let started = false;
let conditionNeg = false;

// IMPORTANT: coords start at 0!!!! End 1 number before max!!!
// IMPORTANT 2: you must include all elements even if they are empty (ex. walls: [])
const level = {

    level1: {
        heights: 5,
        widths: 7,
        walls: [],
        bricks: [
            [3,0]
        ],
        start : [
            [0,2]
        ],
        startType : 'startHorizontal',
        inventoryLoad : ['curveLeftUp']
    },
    level2: {
        heights: 5,
        widths: 7,
        walls: [],
        bricks: [
            [6,0],
            [3,0],
            [3,4]
        ],
        start : [
            [0,2]
        ],
        startType : 'startHorizontal',
        inventoryLoad : ['curveLeftUp', 'quadShoot']
    },
    level3: {
        heights: 5,
        widths: 7,
        walls: [],
        bricks: [
            [6,0],
            [3,2],
            [6,4]
        ],
        start : [
            [0,4]
        ],
        startType : 'startHorizontal',
        inventoryLoad : ['curveRightDown', 'quadShoot']
    },
    level4: {
        heights: 5,
        widths: 7,
        walls: [],
        bricks: [
            [0,0],
            [3,1],
            [6,2],
            [3,3],
            [6,4]
        ],
        start : [
            [0,2]
        ],
        startType : 'startHorizontal',
        inventoryLoad : ['quadShoot', 'quadShoot', 'curveLeftDown']
    },
    level5: {
        heights: 5,
        widths: 8,
        walls: [
            [4,0],
            [4,1],
            [4,2]
        ],
        bricks: [
            [2,0],
            [6,1]
        ],
        start : [
            [0,2]
        ],
        startType : 'startHorizontal',
        inventoryLoad : ['quadShoot', 'curveRightUp', 'curveLeftUp']
    }
}

function increaseLevel() {
    lvlCount++;
    levels = 'level' + lvlCount;
    createGrid(levels);
}

function createGrid(levels) {

    const wallTile = level[levels].walls;
    const brickTile = level[levels].bricks;
    const startTile = level[levels].start;

    let width = level[levels].widths;
    let height = level[levels].heights;
    gridCon.innerHTML = '';

    started = false;
    conditionNeg = false;

    for(let i = 0; i < height; i++) {
        gridCon.appendChild(row.cloneNode(true)); 

        gridCon.childNodes.forEach((element, index) => {
            if(index == i) {
                for(let j = 0; j < width; j++) {
                    for(let k = 0; k < wallTile.length; k++) {

                        if(i == wallTile[k][1] && j == wallTile[k][0]) {
                            isWall = true;
                        }
                    }

                    for(let k = 0; k < brickTile.length; k++) {

                        if(i == brickTile[k][1] && j == brickTile[k][0]) {
                            isBrick = true;
                            bricksLeft.push(isBrick);
                        }
                    }

                    for(let k = 0; k < startTile.length; k++) {

                        if(i == startTile[k][1] && j == startTile[k][0]) {
                            isStartShoot = true;
                            startShoot.className = '';
                            startShoot.classList.add(level[levels].startType);
                        }
                    }

                    if(isWall){
                        element.appendChild(wall.cloneNode(true));
                        isWall = false;
                    } else if(isBrick){
                        element.appendChild(brick.cloneNode(true));
                        isBrick = false;
                    }else if(isStartShoot) {
                        element.appendChild(startShoot.cloneNode(true));
                        isStartShoot = false;
                    }else {
                        element.appendChild(tile.cloneNode(true));
                    }
                }
            }
            rows[i] = element;
        });

    }

    //INVENTORY HERE
    inventory.innerHTML = '';
    level[levels].inventoryLoad.forEach(element => {
        let load = document.createElement('div');
        load.classList.add(element);
        inventory.appendChild(load.cloneNode(true));
    })

    clickAndDrop();
}   

createGrid(levels);

resetButton.addEventListener('click', function() {
    createGrid(levels);
    started = false;
});
// Drag and drop tile 

function clickAndDrop() {
    inventory.childNodes.forEach(elem => {
        elem.addEventListener('click', function(){
            piece = elem;
            clicked = true;
        });
    });


    for (let i = 0; i < rows.length; i++) {
        rows[i].childNodes.forEach(elem => {
            elem.addEventListener('click', function() {
                if(elem.classList.contains('tile') && clicked && !started) {
                    elem.className = ' ';
                    elem.classList.add(piece.className)
    
                    piece.remove();
                    clicked = false;
                }
            });
        });
    }
}

// Explode tiles

const startButton = document.getElementById('startButton');

startButton.addEventListener('click', function() {
    started = true;
    for(let j = 0; j < gridCon.childNodes.length; j++){
        let elem = gridCon.childNodes[j];
        let movementUp = j;
        let movementDown = j;
        for(let i = 0; i < elem.childNodes.length; i++){
            if(elem.childNodes[i].classList.contains('startHorizontal')){
                let movement = i;
                let movementL = i;
                elem.childNodes[movement].appendChild(explosion.cloneNode(true));
                movement++;
                movementL--;
                movementDown++;
                movementUp--;

                console.log(`girdCon: ${gridCon} down: ${movementDown}`);
                rightFunc(elem, movement, 'horizontal', gridCon, movementDown, movementUp);
                leftFunc(elem, movementL, 'horizontal', gridCon, movementDown, movementUp);
            } else if(elem.childNodes[i].classList.contains('startVertical')) {
                let movement = i;
                elem.childNodes[movement].appendChild(explosion.cloneNode(true));
                movementDown++;
                movementUp--;

                // if(gridCon.childNodes[j].childNodes[i])

                // checkTiles(elem, movement, 'vertical', gridCon, movementDown, movementUp);

                downFunc(elem, movement, gridCon, movementDown);
                upFunc(elem, movement, gridCon, movementUp);
            }
        }
    }
});

function rightFunc1(elem, movement, direction, vertElem, down, up) {
    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('tile')) {
        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            movement++;
            rightFunc(elem, movement, 'horizontal', vertElem, down, up);
        }, 500)
    }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('brick')) {
        setTimeout(function(){
            elem.childNodes[movement].classList.remove('brick');
            elem.childNodes[movement].classList.add('tile');
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            movement++;

            checkBricks();
            rightFunc(elem, movement, 'horizontal', vertElem, down, up);
        }, 500)
    }   
}

function rightFunc(elem, movement, direction, vertElem, down, up) {
    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('tile')) {
        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            movement++;
            rightFunc(elem, movement, 'horizontal', vertElem, down, up);
        }, 500)
    }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('brick')) {
        setTimeout(function(){
            elem.childNodes[movement].classList.remove('brick');
            elem.childNodes[movement].classList.add('tile');
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            movement++;

            checkBricks();
            rightFunc(elem, movement, 'horizontal', vertElem, down, up);
        }, 500)
    }   

    // 'curveRightDown', 'curveRightUp', 'quadShoot', 'curveLeftUp', 'curveLeftDown'
    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('curveLeftUp')) {

        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));


            upFunc(elem, movement, vertElem, up);
        }, 500)
    }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('curveLeftDown')) {

        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            // movement++;
            
            // elem, movement, vertElem, down
            downFunc(elem, movement, vertElem, down);
        }, 500)
    }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('quadShoot')) {

        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));

            downFunc(elem, movement, vertElem, down);
            upFunc(elem, movement, vertElem, up);
            movement++;
            rightFunc1(elem, movement, 'horizontal', vertElem, down, up);
        }, 500)
    }
    
}

function leftFunc1(elem, movement, direction, vertElem, down, up) {
    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('tile')) {
        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            movement--;

            leftFunc(elem, movement, 'horizontal', vertElem, down, up);
        }, 500)
    }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('brick')) {
        setTimeout(function(){
            elem.childNodes[movement].classList.remove('brick');
            elem.childNodes[movement].classList.add('tile');
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            setTimeout(function(){
                // elem.childNodes[movement].innerHTML = '';
            }, 200);
            movement--;

            checkBricks();
            leftFunc(elem, movement, 'horizontal', vertElem, down, up);
        }, 500)
    }   

}

function leftFunc(elem, movement, direction, vertElem, down, up) {
    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('tile')) {
        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            movement--;

            leftFunc(elem, movement, 'horizontal', vertElem, down, up);
        }, 500)
    }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('brick')) {
        setTimeout(function(){
            elem.childNodes[movement].classList.remove('brick');
            elem.childNodes[movement].classList.add('tile');
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            setTimeout(function(){
                // elem.childNodes[movement].innerHTML = '';
            }, 200);
            movement--;

            checkBricks();
            leftFunc(elem, movement, 'horizontal', vertElem, down, up);
        }, 500)
    }   

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('curveRightUp')) {
        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));


            upFunc(elem, movement, vertElem, up);
        }, 500)
    }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('curveRightDown')) {
        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));

            downFunc(elem, movement, vertElem, down);
        }, 500)
    }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('quadShoot')) {
        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));

            downFunc(elem, movement, vertElem, down);
            upFunc(elem, movement, vertElem, up);
            movement--;
            leftFunc1(elem, movement, 'horizontal', vertElem, down, up);

        }, 500)
    }

}

function downFunc(elem, movement, vertElem, down) {
    if(vertElem.childNodes[down].childNodes[movement].classList.contains('tile')) {
        setTimeout(function(){
            if(vertElem.childNodes[down].childNodes[movement].classList.contains('tile')) {
                vertElem.childNodes[down].childNodes[movement].appendChild(explosion.cloneNode(true));
            }
            down++;
            downFunc(elem, movement, gridCon, down);
        }, 500);
    }

    if(vertElem.childNodes[down].childNodes[movement].classList.contains('brick')) {
        setTimeout(function(){
            vertElem.childNodes[down].childNodes[movement].classList.remove('brick');
            vertElem.childNodes[down].childNodes[movement].classList.add('tile');
            vertElem.childNodes[down].childNodes[movement].appendChild(explosion.cloneNode(true));
            down++;

            checkBricks();
            rightFunc(elem, movement, 'horizontal');
                
            downFunc(elem, movement, gridCon, down);
        }, 500);
    }
}

function downFunc1(elem, movement, vertElem, down) {
    if(vertElem.childNodes[down].childNodes[movement].classList.contains('tile')) {
        setTimeout(function(){
            if(vertElem.childNodes[down].childNodes[movement].classList.contains('tile')) {
                vertElem.childNodes[down].childNodes[movement].appendChild(explosion.cloneNode(true));
            }
            down++;
            downFunc(elem, movement, gridCon, down);
        }, 500);
    }

    if(vertElem.childNodes[down].childNodes[movement].classList.contains('brick')) {
        setTimeout(function(){
            vertElem.childNodes[down].childNodes[movement].classList.remove('brick');
            vertElem.childNodes[down].childNodes[movement].classList.add('tile');
            vertElem.childNodes[down].childNodes[movement].appendChild(explosion.cloneNode(true));
            down++;

            checkBricks();
            rightFunc(elem, movement, 'horizontal');
                
            downFunc(elem, movement, gridCon, down);
        }, 500);
    }
}

function upFunc(elem, movement, vertElem, up) {
    
    if(vertElem.childNodes[up].childNodes[movement].classList.contains('tile')) {
        setTimeout(function(){
            if(vertElem.childNodes[up].childNodes[movement].classList.contains('tile')) {
                vertElem.childNodes[up].childNodes[movement].appendChild(explosion.cloneNode(true));
            }
            up--;
            upFunc(elem, movement, gridCon, up);
        }, 500);
    }

    if(vertElem.childNodes[up].childNodes[movement].classList.contains('brick')) {
        setTimeout(function(){
            vertElem.childNodes[up].childNodes[movement].classList.remove('brick');
            vertElem.childNodes[up].childNodes[movement].classList.add('tile');
            vertElem.childNodes[up].childNodes[movement].appendChild(explosion.cloneNode(true));
            up--;

            checkBricks();
            rightFunc(elem, movement, 'horizontal');

            upFunc(elem, movement, gridCon, up);
        }, 500);
    }
}

function upFunc1(elem, movement, vertElem, up) {
    
    if(vertElem.childNodes[up].childNodes[movement].classList.contains('tile')) {
        setTimeout(function(){
            if(vertElem.childNodes[up].childNodes[movement].classList.contains('tile')) {
                vertElem.childNodes[up].childNodes[movement].appendChild(explosion.cloneNode(true));
            }
            up--;
            upFunc(elem, movement, gridCon, up);
        }, 500);
    }

    if(vertElem.childNodes[up].childNodes[movement].classList.contains('brick')) {
        setTimeout(function(){
            vertElem.childNodes[up].childNodes[movement].classList.remove('brick');
            vertElem.childNodes[up].childNodes[movement].classList.add('tile');
            vertElem.childNodes[up].childNodes[movement].appendChild(explosion.cloneNode(true));
            up--;

            checkBricks();
            rightFunc(elem, movement, 'horizontal');

            upFunc(elem, movement, gridCon, up);
        }, 500);
    }
}

function checkBricks() {
    let bricksLeft = false;
    gridCon.childNodes.forEach(e => {
        e.childNodes.forEach(ele => {
            if(ele.className == 'brick') {
                bricksLeft = true;
            }
        });
    });

    if(!bricksLeft) {
        setTimeout(function() {
            increaseLevel();
        }, 500)
    }
}
