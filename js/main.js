// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;

var mesh,mesh2;

var wizardP,queenP,hunterP,maidenP,enchantedP;
var wizardE,queenE,hunterE,maidenE,enchantedE;

var blockMesh1,blockMesh2,blockMesh3,blockMesh4,blockMesh5,blockMesh6,blockMesh7,blockMesh8,blockMesh9,blockMesh10,blockMesh11,blockMesh12;

let raycaster;
let mouse;

var selectedPawn = [];
var capturedByP = [];
var capturedByE = [];

class Block {
  constructor(positionX, positionY, name, isFilled) {
    this.positionX = positionX; // for valid move validation
    this.positionY = positionY; // for valid move validation
    this.name = name;
    this.isFilled = isFilled;
  }
}

var block11,
  block12,
  block13,
  block14,
  block21,
  block22,
  block23,
  block24,
  block31,
  block32,
  block33,
  block34;

var boardArr;

function initBlock() {
  block11 = new Block(1, 1, "11", true);
  block12 = new Block(1, 2, "12", false);
  block13 = new Block(1, 3, "13", false);
  block14 = new Block(1, 4, "14", true);

  block21 = new Block(2, 1, "21", true);
  block22 = new Block(2, 2, "22", true);
  block23 = new Block(2, 3, "23", true);
  block24 = new Block(2, 4, "24", true);

  block31 = new Block(3, 1, "31", true);
  block32 = new Block(3, 2, "32", false);
  block33 = new Block(3, 3, "33", false);
  block34 = new Block(3, 4, "34", true);
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

  initBlock();
  boardArr = [
    block11,
    block12,
    block13,
    block14,
    block21,
    block22,
    block23,
    block24,
    block31,
    block32,
    block33,
    block34
  ];
  
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

  const pawnMat1 = new THREE.MeshStandardMaterial({
    color: 0x33ffff, // red
	flatShading: true
  });

  pawnMat1.color.convertSRGBToLinear();

  const pawnMat2 = new THREE.MeshStandardMaterial({
    color: 0x33ffff, // red
	flatShading: true
  });

  pawnMat2.color.convertSRGBToLinear();

  const pawnMat3 = new THREE.MeshStandardMaterial({
    color: 0x33ffff, // red
	flatShading: true
  });

  pawnMat3.color.convertSRGBToLinear();

  const pawnMat4 = new THREE.MeshStandardMaterial({
    color: 0x33ffff, // red
	flatShading: true
  });

  pawnMat4.color.convertSRGBToLinear();

  const pawnMat5 = new THREE.MeshStandardMaterial({
    color: 0xff3333, // blue
	flatShading: true
  });

  pawnMat5.color.convertSRGBToLinear();

  const pawnMat6 = new THREE.MeshStandardMaterial({
    color: 0xff3333, // blue
	flatShading: true
  });

  pawnMat6.color.convertSRGBToLinear();

  const pawnMat7 = new THREE.MeshStandardMaterial({
    color: 0xff3333, // blue
	flatShading: true
  });

  pawnMat7.color.convertSRGBToLinear();

  const pawnMat8 = new THREE.MeshStandardMaterial({
    color: 0xff3333, // blue
	flatShading: true
  });

  pawnMat8.color.convertSRGBToLinear();

  return {
    boardMat,
    pawnMat1,
    pawnMat2,
    pawnMat3,
    pawnMat4,
    pawnMat5,
    pawnMat6,
    pawnMat7,
    pawnMat8
  };
}

function createGeometries() {
  const blockMesh = new THREE.BoxBufferGeometry(2, 0.25, 2);

  // we can reuse a single cylinder geometry for all 4 wheels
  const pawnMesh = new THREE.CylinderBufferGeometry(0.4, 0.4, 1.75, 10);

  return {
    blockMesh,
    pawnMesh
  };
}

function createMeshes() {
  // create a Group to hold the pieces of the train
  const board = new THREE.Group();
  scene.add(board);

  const materials = createMaterials();
  const geometries = createGeometries();

  blockMesh1 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh1.name = "11";
  blockMesh1.position.set(-2.6, 0.21, 6.3);

  blockMesh2 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh2.name = "21";
  blockMesh2.position.set(-0.55, 0.2, 6.3);

  blockMesh3 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh3.name = "31";
  blockMesh3.position.set(1.5, 0.22, 6.3);

  blockMesh4 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh4.name = "12";
  blockMesh4.position.set(-2.6, 0.25, 4.2);

  blockMesh5 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh5.name = "22";
  blockMesh5.position.set(-0.56, 0.22, 4.2);

  blockMesh6 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh6.name = "32";
  blockMesh6.position.set(1.5, 0.2, 4.2);

  blockMesh7 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh7.name = "13";
  blockMesh7.position.set(-2.6, 0.21, 2.1);

  blockMesh8 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh8.name = "23";
  blockMesh8.position.set(-0.55, 0.2, 2.1);

  blockMesh9 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh9.name = "33";
  blockMesh9.position.set(1.5, 0.22, 2.1);

  blockMesh10 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh10.name = "14";
  blockMesh10.position.set(-2.6, 0.2, 0);

  blockMesh11 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh11.name = "24";
  blockMesh11.position.set(-0.54, 0.25, 0);

  blockMesh12 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  blockMesh12.name = "34";
  blockMesh12.position.set(1.56, 0.22, 0);

  board.add(
    blockMesh1,
    blockMesh2,
    blockMesh3,
    blockMesh4,
    blockMesh5,
    blockMesh6,
    blockMesh7,
    blockMesh8,
    blockMesh9,
    blockMesh10,
    blockMesh11,
    blockMesh12
  );

  const defPawns = new THREE.Group();
  scene.add(defPawns);

  wizardP = new THREE.Mesh(geometries.pawnMesh, materials.pawnMat1);
  wizardP.name = "11";
  wizardP.position.set(-2.5, 1.26, 6.3);

  queenP = new THREE.Mesh(geometries.pawnMesh, materials.pawnMat2);
  queenP.name = "21";
  queenP.position.set(-0.54, 1.26, 6.3);

  hunterP = new THREE.Mesh(geometries.pawnMesh, materials.pawnMat3);
  hunterP.name = "31";
  hunterP.position.set(1.56, 1.26, 6.3);

  maidenP = new THREE.Mesh(geometries.pawnMesh, materials.pawnMat4);
  maidenP.name = "22";
  maidenP.position.set(-0.54, 1.26, 4.2);

  hunterE = new THREE.Mesh(geometries.pawnMesh, materials.pawnMat5);
  hunterE.name = "14";
  hunterE.position.set(-2.5, 1.26, 0);

  queenE = new THREE.Mesh(geometries.pawnMesh, materials.pawnMat6);
  queenE.name = "24";
  queenE.position.set(-0.54, 1.26, 0);

  wizardE = new THREE.Mesh(geometries.pawnMesh, materials.pawnMat7);
  wizardE.name = "34";
  wizardE.position.set(1.56, 1.26, 0);

  maidenE = new THREE.Mesh(geometries.pawnMesh, materials.pawnMat8);
  maidenE.name = "23";
  maidenE.position.set(-0.54, 1.26, 2.1);

  defPawns.add(wizardP, queenP, hunterP, maidenP, hunterE, queenE, wizardE, maidenE);
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
	if(selectedPawn[0] == maidenP){
		if((xFrom == xTo) &&  (yDist== 1)){
			return true;
		}
	} 
	// Player's Enchanted Maiden
	else if(selectedPawn[0] == enchantedP){
		if((xFrom-1 < xTo < xFrom+1)&&(yFrom-1 < yTo < yFrom+1)){
			if(!((Math.abs(xDist) == 1)&&(yDist == 1))){
				return true;
			}
		}
	}
	// Queen
	else if((selectedPawn[0] == queenP) || (selectedPawn[0] == queenE)){
		if((xFrom-1 < xTo < xFrom+1)&&(yFrom-1 < yTo < yFrom+1)){
			return true;
		}
	}
	// Wizard
	else if(selectedPawn[0] == wizardP || (selectedPawn[0] == wizardE)){
		if((Math.abs(xDist) == 1)&&(Math.abs(yDist) == 1)){
			return true;
		}
	}
	// Hunter
	else if(selectedPawn[0] == hunterP || (selectedPawn[0] == hunterE)){
		if((Math.abs(xDist) == 1)&&(yTo == yFrom)){
			return true;
		}else if((Math.abs(yDist) == 1)&&(xTo == xFrom)){
			return true;
		}
	}
	
	// Enemy's Maiden
	else if(selectedPawn[0] == maidenE){
		if((xFrom == xTo) &&  (yDist== -1)){
			return true;
		}
	}
	// Enemy's Enchanted Maiden
	else if(selectedPawn[0] == enchantedE){
		if((xFrom-1 < xTo < xFrom+1)&&(yFrom-1 < yTo < yFrom+1)){
			if(!((Math.abs(xDist) == 1)&&(yDist == -1))){
				return true;
			}
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
    mesh2 = [
      blockMesh1,
      blockMesh2,
      blockMesh3,
      blockMesh4,
      blockMesh5,
      blockMesh6,
      blockMesh7,
      blockMesh8,
      blockMesh9,
      blockMesh10,
      blockMesh11,
      blockMesh12
    ];
    var intersects2 = raycaster.intersectObjects(mesh2);

    if (intersects2.length > 0) {
      console.log("move to: " + intersects2[0].object.position.x);
	
      for (var i = 0; i < 12; i++) {
        if (intersects2[0].object.name === boardArr[i].name) {
			console.log(selectedPawn[0].name + " >> " + intersects2[0].object.name + " >> " + boardArr[i].name);
			
			var x, y;
			xFrom = selectedPawn[0].name.charAt(0);
			yFrom = selectedPawn[0].name.charAt(1);
			xTo = intersects2[0].object.name.charAt(0);
			yTo = intersects2[0].object.name.charAt(1);
			
			console.log(xFrom +";"+yFrom+";"+xTo+";"+yTo);
			
			if(isValidMove(xFrom, yFrom, xTo, yTo, selectedPawn[0])){
				 selectedPawn[0].position.set(
				intersects2[0].object.position.x,
				selectedPawn[0].position.y,
				intersects2[0].object.position.z
				);
		        
				boardArr[i].isFilled = true;
				
				for(var j=0;j<12;j++){
					if(boardArr[j].name === selectedPawn[0].name){
						console.log(boardArr[j].name + " >> " + boardArr[j].isFilled);
						
						boardArr[j].isFilled = false;
						
						console.log(boardArr[j].name + " >> " + boardArr[j].isFilled);
						break;
					}
				}
				
				selectedPawn[0].name = boardArr[i].name;
		        
				console.log("moved pawn to " + selectedPawn[0].name);
			} else{
				console.log("Invalid Move pawn [" +selectedPawn[0]+"]");
			}	
        }
      }
    }

    selectedPawn = [];
    setDefaultColor();
  }
  // There is no pawn selected yet
  else {
    mesh = [wizardP, queenP, hunterP, maidenP, hunterE, queenE, wizardE, maidenE]; // three.js objects with click handlers we are interested in

    var intersects = raycaster.intersectObjects(mesh);

    if (intersects.length > 0) {
      setDefaultColor();
      intersects[0].object.material.color.set(0xffffff);
      // intersects[0].object.callback();
      selectedPawn.push(intersects[0].object);
      console.log("selected pawn pos: " + intersects[0].object.position.x);
    } else {
      selectedPawn = [];
      setDefaultColor();
    }
  }
}

function setDefaultColor() {
  wizardP.material.color.set(0x33ffff);
  queenP.material.color.set(0x33ffff);
  hunterP.material.color.set(0x33ffff);
  maidenP.material.color.set(0x33ffff);

  hunterE.material.color.set(0xff0000);
  queenE.material.color.set(0xff0000);
  wizardE.material.color.set(0xff0000);
  maidenE.material.color.set(0xff0000);
  
}

init();
window.addEventListener("resize", onWindowResize);
window.addEventListener("mousedown", onDocumentMouseDown, false);
