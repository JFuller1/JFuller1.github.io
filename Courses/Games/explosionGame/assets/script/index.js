//Audio
const pickupSfx = new Audio('assets/pickup.wav');
const placeSfx = new Audio('assets/place.wav');
const explosionSfx = new Audio('assets/explosion.wav');
const bgMusic = new Audio('assets/bgMusic.mp3');

pickupSfx.volume = 0.5;
placeSfx.volume = 0.5;
explosionSfx.volume = 0.5;
bgMusic.volume = 0.7;

// Grid Creation

const gridCon = document.getElementById('grid');
const resetButton = document.getElementById('reset');

const levelCounter = document.getElementById('level');

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
levelCounter.innerHTML = 'Level ' + lvlCount;

const inventory = document.getElementById('inventory');
let piece = '';
let clicked = false;
let started = false;
let conditionNeg = false;

let firstClick = true;
let attempt = 0;

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
        inventoryLoad : ['curveRightDown', 'tSplitLeftRightUp']
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
        inventoryLoad : ['quadShoot', 'tSplitUpDownLeft', 'curveLeftDown']
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
    },
    level6: {
        heights: 5,
        widths: 9,
        walls: [
            [3,3],
            [3,4]
        ],
        bricks: [
            [0,0],
            [4,0],
            [6,0],
            [2,4],
            [4,4],
            [6,4]
        ],
        start : [
            [0,2]
        ],
        startType : 'startHorizontal',
        inventoryLoad : ['quadShoot', 'tSplitUpDownLeft', 'tSplitLeftRightDown', 'curveLeftUp']
    },
    level7: {
        heights: 6,
        widths: 6,
        walls: [
            [3,2],
            [3,3],
            [3,4]
        ],
        bricks: [
            [2,0],
            [3,5],
            [1,1],
            [1,5],
            [5,2]
        ],
        start : [
            [0,0]
        ],
        startType : 'startVertical',
        inventoryLoad : ['curveLeftDown', 'curveRightUp', 'tSplitLeftRightUp', 'curveLeftUp']
    },
    level8: {
        heights: 5,
        widths: 5,
        walls: [
            [0,2],
            [1,2],
            [4,4]
        ],
        bricks: [
            [1,3],
            [2,2],
            [3,1],
            [4,0]
        ],
        start : [
            [0,4]
        ],
        startType : 'startHorizontal',
        inventoryLoad : ['quadShoot', 'curveLeftUp', 'curveRightDown','tSplitLeftRightDown']
    },
    level9: {
        heights: 7,
        widths: 10,
        walls: [
            [0,2],
            [1,2],
            [2,2],
            [3,2],
            [3,4],
            [4,4],
            [5,4],
            [6,4],
            [7,4],
            [8,4],
            [9,4]
        ],
        bricks: [
            [4,0],
            [8,3],
            [1,6],
            [2,6],
            [6,6],
            [8,6]
        ],
        start : [
            [0,3]
        ],
        startType : 'startHorizontal',
        inventoryLoad : ['quadShoot', 'curveLeftUp', 'curveRightUp', 'tSplitUpDownRight', 'tSplitLeftRightUp']
    }
    // level10: {
    //     heights: 7,
    //     widths: 13,
    //     walls: [
    //         [2,4],
    //         [2,5],
    //         [0,0]
    //     ],
    //     bricks: [
    //         [4,1],
    //         [11,1],
    //         [2,2],
    //         [3,3],
    //         [10,3],
    //         [3,6],
    //         [11,6]
    //     ],
    //     start : [
    //         [2,0]
    //     ],
    //     startType : 'startVertical',
    //     inventoryLoad : ['quadShoot', 'curveLeftUp', 'curveRightUp', 'tSplitUpDownLeft', 'quadShoot']
    // }
}

function increaseLevel() {
    lvlCount++;
    if(lvlCount == 10) {
        window.location.href = 'win.html';
        localStorage.setItem('time',timer.innerText);
        localStorage.setItem('attempt', attempt);

    } else {
        levels = 'level' + lvlCount;
        levelCounter.innerHTML = 'Level ' + lvlCount;
        createGrid(levels);
    }
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
    inventoryMargin();

}   

function inventoryMargin() {
    if(inventory.childNodes.length >= 3) {
        let invenStyle = inventory.querySelectorAll('div');
        invenStyle.forEach(elem => {
            elem.style.margin = '10px';
        })
    }
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
            pickupSfx.play();
            inventory.childNodes.forEach(e => { e.classList.remove('pieceSelected'); });
            piece.classList.add('pieceSelected');
        });
    });


    for (let i = 0; i < rows.length; i++) {
        rows[i].childNodes.forEach(elem => {
            elem.addEventListener('click', function() {
                if(elem.classList.contains('tile') && clicked && !started) {
                    elem.className = ' ';
                    piece.classList.remove('pieceSelected');
                    elem.classList.add(piece.className)
                    placeSfx.play();
                    
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
    bgMusic.play();
    if(started == false) {
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
                explosionSfx.play();
                movement++;
                movementL--;
                movementDown++;
                movementUp--;

                rightFunc(elem, movement, 'horizontal', gridCon, movementDown, movementUp);
                leftFunc(elem, movementL, 'horizontal', gridCon, movementDown, movementUp);
            } else if(elem.childNodes[i].classList.contains('startVertical')) {
                let movement = i;
                elem.childNodes[movement].appendChild(explosion.cloneNode(true));
                explosionSfx.play();
                movementDown++;
                movementUp--;

                // if(gridCon.childNodes[j].childNodes[i])

                // checkTiles(elem, movement, 'vertical', gridCon, movementDown, movementUp);

                downFunc(elem, movement, gridCon, movementDown, movementUp);
                upFunc(elem, movement, gridCon, movementDown, movementUp);
                }
            }
        }
    }
});

function rightFunc(elem, movement, direction, vertElem, down, up) {
    // if(elem.childNodes[movement].hasChildNodes()){
    //     elem.childNodes[movement].innerHTML = ' ';
    // }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('tile')) {

        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();
            movement++;
            rightFunc(elem, movement, 'horizontal', vertElem, down, up);
        }, 300)
    }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('brick')) {
        setTimeout(function(){
            elem.childNodes[movement].classList.remove('brick');
            elem.childNodes[movement].classList.add('tile');
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();
            movement++;

            checkBricks();
            rightFunc(elem, movement, 'horizontal', vertElem, down, up);
        }, 300)
    }   

    // 'curveRightDown', 'curveRightUp', 'quadShoot', 'curveLeftUp', 'curveLeftDown'
    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('curveLeftUp')) {

        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();


            upFunc(elem, movement, vertElem, down, up);
        }, 300)
    }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('curveLeftDown')) {

        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();
            // movement++;
            
            // elem, movement, vertElem, down
            downFunc(elem, movement, vertElem, down, up);
        }, 300)
    }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('quadShoot')) {

        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();

            downFunc(elem, movement, vertElem, down, up);
            upFunc(elem, movement, vertElem, down, up);
            movement++;
            rightFunc(elem, movement, 'horizontal', vertElem, down, up);
        }, 300)
    }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('tSplitLeftRightUp')) {

        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();

            upFunc(elem, movement, vertElem, down, up);
            movement++;
            rightFunc(elem, movement, 'horizontal', vertElem, down, up);
        }, 300)
    }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('tSplitUpDownLeft')) {

        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();

            upFunc(elem, movement, vertElem, down, up);
            downFunc(elem, movement, vertElem, down, up);
        }, 300)
    }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('tSplitLeftRightDown')) {

        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();

            downFunc(elem, movement, vertElem, down, up);           
            movement++;
            rightFunc(elem, movement, 'horizontal', vertElem, down, up);
        }, 300)
    }
    
}


function leftFunc(elem, movement, direction, vertElem, down, up) {
    // if(elem.childNodes[movement].hasChildNodes()){
    //     elem.childNodes[movement].innerHTML = ' ';
    // }
    
    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('tile')) {
        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();

            movement--;
            leftFunc(elem, movement, 'horizontal', vertElem, down, up);
        }, 300)
    }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('brick')) {
        setTimeout(function(){
            elem.childNodes[movement].classList.remove('brick');
            elem.childNodes[movement].classList.add('tile');
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();
            setTimeout(function(){
                // elem.childNodes[movement].innerHTML = '';
            }, 200);
            movement--;

            checkBricks();
            leftFunc(elem, movement, 'horizontal', vertElem, down, up);
        }, 300)
    }   

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('curveRightUp')) {
        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();

            upFunc(elem, movement, vertElem, down, up);
        }, 300)
    }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('curveRightDown')) {
        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();

            downFunc(elem, movement, vertElem, down, up);
        }, 300)
    }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('quadShoot')) {
        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();

            downFunc(elem, movement, vertElem, down, up);
            upFunc(elem, movement, vertElem, down, up);
            movement--;
            leftFunc(elem, movement, 'horizontal', vertElem, down, up);

        }, 300)
    }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('tSplitLeftRightDown')) {
        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();

            downFunc(elem, movement, vertElem, down, up);
            movement--;
            leftFunc(elem, movement, 'horizontal', vertElem, down, up);

        }, 300)
    }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('tSplitLeftRightUp')) {
        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();

            upFunc(elem, movement, vertElem, down, up);
            movement--;
            leftFunc(elem, movement, 'horizontal', vertElem, down, up);

        }, 300)
    }

    if(direction == 'horizontal' && elem.childNodes[movement].classList.contains('tSplitUpDownRight')) {
        setTimeout(function(){
            elem.childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();

            upFunc(elem, movement, vertElem, down, up);
            downFunc(elem, movement, vertElem, down, up);

        }, 300)
    }

}

function downFunc(elem, movement, vertElem, down, up) {
    // if(vertElem.childNodes[down].childNodes[movement].hasChildNodes()){
    //     vertElem.childNodes[down].childNodes[movement].innerHTML = ' ';
    // }

    if(vertElem.childNodes[down].childNodes[movement].classList.contains('tile')) {
        setTimeout(function(){
            vertElem.childNodes[down].childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();
            down++;
            downFunc(elem, movement, gridCon, down, up);
        }, 300);
    }

    if(vertElem.childNodes[down].childNodes[movement].classList.contains('brick')) {
        setTimeout(function(){
            vertElem.childNodes[down].childNodes[movement].classList.remove('brick');
            vertElem.childNodes[down].childNodes[movement].classList.add('tile');
            vertElem.childNodes[down].childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();
            down++;

            checkBricks();
                
            downFunc(elem, movement, gridCon, down, up);
        }, 300);
    }

    if(vertElem.childNodes[down].childNodes[movement].classList.contains('curveLeftUp')) {
        setTimeout(function(){
            vertElem.childNodes[down].childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();
            movement--;

            let downClone = down;
            downClone--;
            up = downClone;

            leftFunc(vertElem.childNodes[down], movement, 'horizontal', vertElem, down, up);
        }, 300);
    }

    if(vertElem.childNodes[down].childNodes[movement].classList.contains('curveRightUp')) {
        setTimeout(function(){
            vertElem.childNodes[down].childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();
            let downClone = down;
            downClone--;
            up = downClone;
            movement++;
            rightFunc(vertElem.childNodes[down], movement, 'horizontal', vertElem, down, up);
        }, 300);
    }

    if(vertElem.childNodes[down].childNodes[movement].classList.contains('quadShoot')) {
        setTimeout(function(){
            vertElem.childNodes[down].childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();

            let downClone = down;
            downClone--;
            up = downClone;
            movement++;
            rightFunc(vertElem.childNodes[down], movement, 'horizontal', vertElem, down, up);
            movement -= 2;
            leftFunc(vertElem.childNodes[down], movement, 'horizontal', vertElem, down, up);
            movement++;
            down++;
            downFunc(elem, movement, gridCon, down, up);
        }, 300);
    }

    if(vertElem.childNodes[down].childNodes[movement].classList.contains('tSplitUpDownLeft')) {
        setTimeout(function(){
            let downClone = down;
            downClone--;
            up = downClone;
            vertElem.childNodes[down].childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();
            movement--;
            leftFunc(vertElem.childNodes[down], movement, 'horizontal', vertElem, down, up);
            movement++;
            down++;
            downFunc(elem, movement, gridCon, down, up);
        }, 300);
    }

    if(vertElem.childNodes[down].childNodes[movement].classList.contains('tSplitUpDownRight')) {
        setTimeout(function(){
            vertElem.childNodes[down].childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();
            let downClone = down;
            downClone--;
            up = downClone;
            vertElem.childNodes[down].childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();
            movement++;
            rightFunc(vertElem.childNodes[down], movement, 'horizontal', vertElem, down, up);
            movement--;
            down++;
            downFunc(elem, movement, gridCon, down, up);
        }, 300);
    }

    if(vertElem.childNodes[down].childNodes[movement].classList.contains('tSplitLeftRightUp')) {
        setTimeout(function(){
            vertElem.childNodes[down].childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();
            let downClone = down;
            downClone--;
            up = downClone;
            movement++;
            rightFunc(vertElem.childNodes[down], movement, 'horizontal', vertElem, down, up);
            movement -= 2;
            leftFunc(vertElem.childNodes[down], movement, 'horizontal', vertElem, down, up);
        }, 300);
    }
}

function upFunc(elem, movement, vertElem, down, up) {
    // if(vertElem.childNodes[up].childNodes[movement].hasChildNodes()){
    //     vertElem.childNodes[up].childNodes[movement].innerHTML = ' ';
    // }
    
    if(vertElem.childNodes[up].childNodes[movement].classList.contains('tile')) {
        setTimeout(function(){
            if(vertElem.childNodes[up].childNodes[movement].classList.contains('tile')) {
                vertElem.childNodes[up].childNodes[movement].appendChild(explosion.cloneNode(true));
                explosionSfx.play();
            }
            up--;
            upFunc(elem, movement, gridCon, down, up);
        }, 300);
    }

    if(vertElem.childNodes[up].childNodes[movement].classList.contains('brick')) {
        setTimeout(function(){
            vertElem.childNodes[up].childNodes[movement].classList.remove('brick');
            vertElem.childNodes[up].childNodes[movement].classList.add('tile');
            vertElem.childNodes[up].childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();
            up--;

            checkBricks();

            upFunc(elem, movement, gridCon, down, up);
        }, 300);
    }

    if(vertElem.childNodes[up].childNodes[movement].classList.contains('quadShoot')) {
        setTimeout(function(){

            vertElem.childNodes[up].childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();

            let upClone = up;
            upClone++;
            down = upClone;
            movement++;
            rightFunc(vertElem.childNodes[up], movement, 'horizontal', vertElem, down, up);
            movement -= 2;
            leftFunc(vertElem.childNodes[up], movement, 'horizontal', vertElem, down, up);
            movement++;
            up--;
            upFunc(elem, movement, gridCon, down, up);

        }, 300);
    }
        //,, , , 'tSplitLeftRightUp', , 'quadShoot'

    if(vertElem.childNodes[up].childNodes[movement].classList.contains('curveRightDown')) {
        setTimeout(function(){
            vertElem.childNodes[up].childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();

            let upClone = up;
            upClone++;
            down = upClone;
            movement++;
            rightFunc(vertElem.childNodes[up], movement, 'horizontal', vertElem, down, up);
        }, 300);
    }

    if(vertElem.childNodes[up].childNodes[movement].classList.contains('curveLeftDown')) {
        setTimeout(function(){
            vertElem.childNodes[up].childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();

            let upClone = up;
            upClone++;
            down = upClone;
            movement--;
            leftFunc(vertElem.childNodes[up], movement, 'horizontal', vertElem, down, up);
        }, 300);
    }

    if(vertElem.childNodes[up].childNodes[movement].classList.contains('tSplitUpDownLeft')) {
        setTimeout(function(){
            vertElem.childNodes[up].childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();

            let upClone = up;
            upClone++;
            down = upClone;
            movement--;
            leftFunc(vertElem.childNodes[up], movement, 'horizontal', vertElem, down, up);
            movement++;
            up--;
            upFunc(elem, movement, gridCon, down, up);
        }, 300);
    }

    if(vertElem.childNodes[up].childNodes[movement].classList.contains('tSplitUpDownRight')) {
        setTimeout(function(){
            vertElem.childNodes[up].childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();

            let upClone = up;
            upClone++;
            down = upClone;
            movement++;
            rightFunc(vertElem.childNodes[up], movement, 'horizontal', vertElem, down, up);
            movement--;
            up--;
            upFunc(elem, movement, gridCon, down, up);
        }, 300);
    }

    if(vertElem.childNodes[up].childNodes[movement].classList.contains('tSplitLeftRightDown')) {
        setTimeout(function(){
            vertElem.childNodes[up].childNodes[movement].appendChild(explosion.cloneNode(true));
            explosionSfx.play();

            let upClone = up;
            upClone++;
            down = upClone;
            movement++;
            rightFunc(vertElem.childNodes[up], movement, 'horizontal', vertElem, down, up);
            movement -= 2;
            leftFunc(vertElem.childNodes[up], movement, 'horizontal', vertElem, down, up);
        }, 300);
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

let timer = document.getElementById('timer');
let seconds = document.getElementById('seconds');
let minutes = document.getElementById('minutes');
let totalSeconds = 0;

document.querySelector('body').addEventListener('click', function() {
    if(firstClick) {
        setInterval(setTime, 1000);
        firstClick = false;
        attempt = localStorage.getItem('attempt');
        attempt++;
    }
})

function setTime() {
    ++totalSeconds;
    seconds.innerHTML = pad(totalSeconds % 60);
    minutes.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
}

if(!localStorage.getItem('timeArray')) {
    localStorage.setItem('attempt', attempt);
    localStorage.setItem('timeArray', JSON.stringify(['60:00']));
}