// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;
let raycaster;
let mouse;

class Block {
	constructor(positionX, positionY, object, isFilled) {
		this.positionX = positionX; // for valid move validation
		this.positionY = positionY; // for valid move validation
		this.object = object;
		this.isFilled = isFilled;
	}
}

class Piece {
	constructor(type, object, positionX, positionY, isPlayer) {
		this.type = type;
		this.object = object;
		this.positionX = positionX; // for valid move validation
		this.positionY = positionY; // for valid move validation
		this.isPlayer = isPlayer;
	}
}

var rcPawn,rcBlock;

var pawn = [];
var board = [];
var blockMesh1,blockMesh2,blockMesh3,blockMesh4,blockMesh5,blockMesh6,blockMesh7,blockMesh8,blockMesh9,blockMesh10,blockMesh11,blockMesh12;
var wizardP,queenP,hunterP,maidenP,enchantedP;
var wizardE,queenE,hunterE,maidenE,enchantedE;

var selectedPawn = [];
var capturedByP = [];
var capturedByE = [];


function initBoard() {
  const materials = createMaterials();
  const geometries = createGeometries();

  blockMesh1 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh1.position.set(-2.6, 0.21, 6.3);

  blockMesh2 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh2.position.set(-0.55, 0.2, 6.3);

  blockMesh3 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh3.position.set(1.5, 0.22, 6.3);

  blockMesh4 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh4.position.set(-2.6, 0.25, 4.2);

  blockMesh5 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh5.position.set(-0.56, 0.22, 4.2);

  blockMesh6 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh6.position.set(1.5, 0.2, 4.2);

  blockMesh7 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh7.position.set(-2.6, 0.21, 2.1);

  blockMesh8 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh8.position.set(-0.55, 0.2, 2.1);

  blockMesh9 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh9.position.set(1.5, 0.22, 2.1);

  blockMesh10 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh10.position.set(-2.6, 0.2, 0);

  blockMesh11 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh11.position.set(-0.54, 0.25, 0);

  blockMesh12 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh12.position.set(1.56, 0.22, 0);
  
  board.push(new Block(1, 1, blockMesh1, true));
  board.push(new Block(2, 1, blockMesh2, false));
  board.push(new Block(3, 1, blockMesh3, false));
  board.push(new Block(1, 2, blockMesh4, true));
  board.push(new Block(2, 2, blockMesh5, true));
  board.push(new Block(3, 2, blockMesh6, true));
  board.push(new Block(1, 3, blockMesh7, true));
  board.push(new Block(2, 3, blockMesh8, true));
  board.push(new Block(3, 3, blockMesh9, true));
  board.push(new Block(1, 4, blockMesh10, false));
  board.push(new Block(2, 4, blockMesh11, false));
  board.push(new Block(3, 4, blockMesh12, true));
  
  for(var i = 0;i<board.length;i++){
	scene.add(board[i].object);
  }
}

function initPawn(){
  const materials = createMaterials();
  const geometries = createGeometries();
	
  wizardP = new THREE.Mesh(geometries.pawnMesh, materials.wizardPMat);
  wizardP.position.set(-2.5, 1.26, 6.3);

  queenP = new THREE.Mesh(geometries.pawnMesh, materials.queenPMat);
  queenP.position.set(-0.54, 1.26, 6.3);

  hunterP = new THREE.Mesh(geometries.pawnMesh, materials.hunterPMat);
  hunterP.position.set(1.56, 1.26, 6.3);

  maidenP = new THREE.Mesh(geometries.pawnMesh, materials.maidenPMat);
  maidenP.position.set(-0.54, 1.26, 4.2);

  hunterE = new THREE.Mesh(geometries.pawnMesh, materials.hunterEMat);
  hunterE.position.set(-2.5, 1.26, 0);

  queenE = new THREE.Mesh(geometries.pawnMesh, materials.queenEMat);
  queenE.position.set(-0.54, 1.26, 0);

  wizardE = new THREE.Mesh(geometries.pawnMesh, materials.wizardEMat);
  wizardE.position.set(1.56, 1.26, 0);

  maidenE = new THREE.Mesh(geometries.pawnMesh, materials.maidenEMat);
  maidenE.position.set(-0.54, 1.26, 2.1);
	
  pawn.push(new Piece("maiden", maidenP, 2, 2, true));
  pawn.push(new Piece("wizard", wizardP, 1, 1, true));
  pawn.push(new Piece("queen", queenP, 2, 1, true));
  pawn.push(new Piece("hunter", hunterP, 3, 1, true));
  
  pawn.push(new Piece("maiden", maidenE, 2, 3, false));
  pawn.push(new Piece("hunter", hunterE, 1, 4, false));
  pawn.push(new Piece("queen", queenE, 2, 4, false));
  pawn.push(new Piece("wizard", wizardE, 3, 4, false));
  
  for(var i = 0;i<pawn.length;i++){
	scene.add(pawn[i].object);
  }
}

function init() {
  container = document.querySelector("#game-container");

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1f262a);

  createCamera();
  createControls();
  createLights();
  createMeshes();
  createRenderer();
  
  // start the animation loop
  renderer.setAnimationLoop(() => {
    update();
    render();
  });
}

function createCamera() {
  camera = new THREE.PerspectiveCamera(
    35, // FOV
    container.clientWidth / container.clientHeight, // aspect
    0.1, // near clipping plane
    100 // far clipping plane
  );

  camera.position.set(-9, 10, 20);
}

function createControls() {
  controls = new THREE.OrbitControls(camera, container);
}

function createLights() {
  const ambientLight = new THREE.HemisphereLight(
    0xddeeff, // sky color
    0x202020, // ground color
    5 // intensity
  );

  const mainLight = new THREE.DirectionalLight(0xffffff, 5);
  mainLight.position.set(10, 10, 10);

  scene.add(ambientLight, mainLight);
}

function createMaterials() {
  const boardMat = new THREE.MeshStandardMaterial({
    color: 0xe6e0d4, // white
	flatShading: true
  });

  // just as with textures, we need to put colors into linear color space
  boardMat.color.convertSRGBToLinear();

  const wizardPMat = new THREE.MeshStandardMaterial({
    color: 0x33ffff, // red
	flatShading: true
  });

  wizardPMat.color.convertSRGBToLinear();

  const queenPMat = new THREE.MeshStandardMaterial({
    color: 0x33ffff, // red
	flatShading: true
  });

  queenPMat.color.convertSRGBToLinear();

  const hunterPMat = new THREE.MeshStandardMaterial({
    color: 0x33ffff, // red
	flatShading: true
  });

  hunterPMat.color.convertSRGBToLinear();

  const maidenPMat = new THREE.MeshStandardMaterial({
    color: 0x33ffff, // red
	flatShading: true
  });

  maidenPMat.color.convertSRGBToLinear();

  const hunterEMat = new THREE.MeshStandardMaterial({
    color: 0xff3333, // blue
	flatShading: true
  });

  hunterEMat.color.convertSRGBToLinear();

  const queenEMat = new THREE.MeshStandardMaterial({
    color: 0xff3333, // blue
	flatShading: true
  });

  queenEMat.color.convertSRGBToLinear();

  const wizardEMat = new THREE.MeshStandardMaterial({
    color: 0xff3333, // blue
	flatShading: true
  });

  wizardEMat.color.convertSRGBToLinear();

  const maidenEMat = new THREE.MeshStandardMaterial({
    color: 0xff3333, // blue
	flatShading: true
  });

  maidenEMat.color.convertSRGBToLinear();

  return {
    boardMat,
    wizardPMat,
    queenPMat,
    hunterPMat,
    maidenPMat,
    hunterEMat,
    queenEMat,
    wizardEMat,
    maidenEMat
  };
}

function createGeometries() {
  const blockMesh = new THREE.BoxBufferGeometry(2, 0.25, 2);
	
  const pawnMesh = new THREE.CylinderBufferGeometry(0.4, 0.4, 1.75, 10);

  return {
    blockMesh,
    pawnMesh
  };
}

function createMeshes() {
  initBoard();
  initPawn();
}

function createRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);

  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  renderer.physicallyCorrectLights = true;

  container.appendChild(renderer.domElement);
}

// perform any updates to the scene, called once per frame
// avoid heavy computation here
function update() {
  // Don't delete this function!
}

// render, or 'draw a still image', of the scene
function render() {
  renderer.render(scene, camera);
}

// a function that will be called every time the window gets resized.
// It can get called a lot, so don't put any heavy computation in here!
function onWindowResize() {
  // set the aspect ratio to match the new browser window aspect ratio
  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  // update the size of the renderer AND the canvas
  renderer.setSize(container.clientWidth, container.clientHeight);
}

// Pawn Valid Move
function isValidMove(xFrom, yFrom, xTo, yTo, object){
	var xDist, yDist;
	xDist = xTo - xFrom;
	yDist = yTo - yFrom;
		
	// Player's Maiden
	if(object.type == "maiden" && object.isPlayer){
		if((xFrom == xTo) &&  (yDist== 1)){
			return true;
		}
	} 
	// Player's Enchanted Maiden
	else if(object.type == "enchanted" && object.isPlayer){
		if((Math.abs(xDist) == 1)&&(yDist == 1)){
			return true;
		}else if((Math.abs(xDist) == 1)&&(yTo == yFrom)){
			return true;
		}else if((Math.abs(yDist) == 1)&&(xTo == xFrom)){
			return true;
		}
	}
	// Queen
	else if(object.type == "queen"){
		if((Math.abs(xDist) == 1)&&(Math.abs(yDist) == 1)){
			return true;
		}else if((Math.abs(xDist) == 1)&&(yTo == yFrom)){
			return true;
		}else if((Math.abs(yDist) == 1)&&(xTo == xFrom)){
			return true;
		}
	}
	// Wizard
	else if(object.type == "wizard"){
		if((Math.abs(xDist) == 1)&&(Math.abs(yDist) == 1)){
			return true;
		}
	}
	// Hunter
	else if(object.type == "hunter"){
		if((Math.abs(xDist) == 1)&&(yTo == yFrom)){
			return true;
		}else if((Math.abs(yDist) == 1)&&(xTo == xFrom)){
			return true;
		}
	}
	
	// Enemy's Maiden
	else if((object.type == "maiden") && (!object.isPlayer)){
		if((xFrom == xTo) &&  (yDist== -1)){
			return true;
		}
	}
	// Enemy's Enchanted Maiden
	else if((object.type == "enchanted") && (!object.isPlayer)){
		if((Math.abs(xDist) == 1)&&(yDist == -1)){
			return true;
		}else if((Math.abs(xDist) == 1)&&(yTo == yFrom)){
			return true;
		}else if((Math.abs(yDist) == 1)&&(xTo == xFrom)){
			return true;
		}
	}
}

function onDocumentMouseDown(event) {
  //console.log("selectedPawn " + selectedPawn[0].object.position.x);
  event.preventDefault();

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  if (selectedPawn.length > 0) {
	rcBlock = [];
	  
    for(var i=0;i<board.length;i++){
		rcBlock.push(board[i].object);
	}
	
    var intersectBlock = raycaster.intersectObjects(rcBlock);
	var selectedBlock = [];
	
    if (intersectBlock.length > 0) {
		for(var i=0;i<board.length;i++){
			if(intersectBlock[0].object == board[i].object){
			selectedBlock.push(board[i]);
			console.log("selected block pos: " + board[i].positionX + ", " + board[i].positionY);
			}
		}
		
		var x, y;
		xFrom = selectedPawn[0].positionX;
		yFrom = selectedPawn[0].positionY;
		xTo = selectedBlock[0].positionX;
		yTo = selectedBlock[0].positionY;
		
		console.log(xFrom +"; "+yFrom+"; "+xTo+"; "+yTo);
		
		if(isValidMove(xFrom, yFrom, xTo, yTo, selectedPawn[0])){
			if(selectedBlock[0].isFilled){
				
			} 
			// No pawn in the selected Block
			else{
				
			}	
			
			selectedBlock[0].isFilled = true;
			
			for(var j=0;j<12;j++){
				if((board[j].positionX == selectedPawn[0].positionX)&&(board[j].positionY == selectedPawn[0].positionY)){
					board[j].isFilled = false;
					break;
				}
			}
			
			if((selectedPawn[0].type === "maiden" && selectedPawn[0].isPlayer) && (selectedBlock[0].positionY == 4)){
				selectedPawn[0].type = "enchanted";
			} else if((selectedPawn[0].type === "maiden" && !selectedPawn[0].isPlayer) && (selectedBlock[0].positionY == 1)){
				selectedPawn[0].type = "enchanted";
			}
			
			selectedPawn[0].object.position.set(
			selectedBlock[0].object.position.x,
			selectedPawn[0].object.position.y,
			selectedBlock[0].object.position.z
			);
			
			selectedPawn[0].positionX = selectedBlock[0].positionX;
			selectedPawn[0].positionY = selectedBlock[0].positionY;
			
			selectedPawn.pop();
			selectedBlock.pop();
		} else{
			console.log("Invalid Move pawn [" +selectedPawn[0]+"]");
		}	
        
    }

    selectedPawn = [];
  }
  // There is no pawn selected yet
  else {
	rcPawn = [];
	
	for(var i=0;i<pawn.length;i++){
		rcPawn.push(pawn[i].object);
	}
	
    var intersectPawn = raycaster.intersectObjects(rcPawn);

    if (intersectPawn.length > 0){
      // intersectPawn[0].object.callback();
	  for(var i=0;i<pawn.length;i++){
		if(intersectPawn[0].object == pawn[i].object){
			selectedPawn.push(pawn[i]);
			console.log("selected pawn pos: " + pawn[i].positionX + ", " + pawn[i].positionY);
		}
	  }
      
    } else {
      selectedPawn = [];
    }
  }
}

init();
window.addEventListener("resize", onWindowResize);
window.addEventListener("mousedown", onDocumentMouseDown, false);
