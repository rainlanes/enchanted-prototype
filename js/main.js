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

class JailBlock {
	constructor(object, isFilled, isPlayer) {
		this.object = object;
		this.isFilled = isFilled;
		this.isPlayer = isPlayer;
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

var rcPawn,rcBlock, rcCaptured;

var state = new Array(4);

for (var i = 0; i < state.length; i++) {
  state[i] = new Array(3);
}

var pawn = [];
var board = [];
var jail = [];
var blockMesh1,blockMesh2,blockMesh3,blockMesh4,blockMesh5,blockMesh6,blockMesh7,blockMesh8,blockMesh9,blockMesh10,blockMesh11,blockMesh12;
var wizardP,queenP,hunterP,maidenP,enchantedP;
var wizardE,queenE,hunterE,maidenE,enchantedE;

var selectedPawn = [];
var selectedCaptured = [];
var capturedByP = [];
var capturedByE = [];

var playerTurn = true;

function updateState(){
	for (var i = 0; i < state.length; i++){
		state[i][0] = null;
		state[i][1] = null;
		state[i][2] = null;
	}

	console.log(state);
	
	for(var i=0;i<pawn.length;i++){
		var x, y;
		x = pawn[i].positionX - 1;
		y = pawn[i].positionY - 1;
		
		console.log(x + ", " + y);
		
		state[y][x] = pawn[i];
	}
	
	console.log(state);
}

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
  board.push(new Block(2, 1, blockMesh2, true));
  board.push(new Block(3, 1, blockMesh3, true));
  board.push(new Block(1, 2, blockMesh4, false));
  board.push(new Block(2, 2, blockMesh5, true));
  board.push(new Block(3, 2, blockMesh6, false));
  board.push(new Block(1, 3, blockMesh7, false));
  board.push(new Block(2, 3, blockMesh8, true));
  board.push(new Block(3, 3, blockMesh9, false));
  board.push(new Block(1, 4, blockMesh10, true));
  board.push(new Block(2, 4, blockMesh11, true));
  board.push(new Block(3, 4, blockMesh12, true));
    
  for(var i = 0;i<board.length;i++){
	scene.add(board[i].object);
  }
  
  var jailMesh1, jailMesh2, jailMesh3, jailMesh4, jailMesh5, jailMesh6, jailMesh7, jailMesh8, jailMesh9, jailMesh10, jailMesh11, jailMesh12;
  
  jailMesh1 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  jailMesh1.position.set(-2.5, 0.22, 10);
  
  jailMesh2 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  jailMesh2.position.set(-0.5, 0.22, 10);
  
  jailMesh3 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  jailMesh3.position.set(1.5, 0.22, 10);
  
  jailMesh4 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  jailMesh4.position.set(-2.5, 0.22, 12);
  
  jailMesh5 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  jailMesh5.position.set(-0.5, 0.22, 12);
  
  jailMesh6 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  jailMesh6.position.set(1.5, 0.22, 12);
  
  jailMesh7 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  jailMesh7.position.set(-2.5, 0.22, -4);
  
  jailMesh8 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  jailMesh8.position.set(-0.5, 0.22, -4);
  
  jailMesh9 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  jailMesh9.position.set(1.5, 0.22, -4);
  
  jailMesh10 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  jailMesh10.position.set(-2.5, 0.22, -6);
  
  jailMesh11 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  jailMesh11.position.set(-0.5, 0.22, -6);
  
  jailMesh12 = new THREE.Mesh(geometries.blockMesh, materials.boardMat);
  jailMesh12.position.set(1.5, 0.22, -6);
  
  jail.push(new JailBlock(jailMesh1, false, true));
  jail.push(new JailBlock(jailMesh2, false, true));
  jail.push(new JailBlock(jailMesh3, false, true));
  jail.push(new JailBlock(jailMesh4, false, true));
  jail.push(new JailBlock(jailMesh5, false, true));
  jail.push(new JailBlock(jailMesh6, false, true));
  
  jail.push(new JailBlock(jailMesh7, false, false));
  jail.push(new JailBlock(jailMesh8, false, false));
  jail.push(new JailBlock(jailMesh9, false, false));
  jail.push(new JailBlock(jailMesh10, false, false));
  jail.push(new JailBlock(jailMesh11, false, false));
  jail.push(new JailBlock(jailMesh12, false, false));

  
  for(var i = 0;i<jail.length;i++){
	scene.add(jail[i].object);
  }
}

function initPawn(){
  const materials = createMaterials();
  const geometries = createGeometries();

  wizardP = new THREE.Mesh(geometries.pawnMesh, materials.pawnPMat);
  wizardP.position.set(-2.5, 1.26, 6.3);

  queenP = new THREE.Mesh(geometries.pawnMesh, materials.pawnPMat);
  queenP.position.set(-0.54, 1.26, 6.3);

  hunterP = new THREE.Mesh(geometries.pawnMesh, materials.pawnPMat);
  hunterP.position.set(1.56, 1.26, 6.3);

  maidenP = new THREE.Mesh(geometries.pawnMesh, materials.pawnPMat);
  maidenP.position.set(-0.54, 1.26, 4.2);

  hunterE = new THREE.Mesh(geometries.pawnMesh, materials.pawnEMat);
  hunterE.position.set(-2.5, 1.26, 0);

  queenE = new THREE.Mesh(geometries.pawnMesh, materials.pawnEMat);
  queenE.position.set(-0.54, 1.26, 0);

  wizardE = new THREE.Mesh(geometries.pawnMesh, materials.pawnEMat);
  wizardE.position.set(1.56, 1.26, 0);

  maidenE = new THREE.Mesh(geometries.pawnMesh, materials.pawnEMat);
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
  
  updateState();
  
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

  const pawnPMat = new THREE.MeshStandardMaterial({
    color: 0x33ffff, // red
	flatShading: true
  });

  pawnPMat.color.convertSRGBToLinear();

  const pawnEMat = new THREE.MeshStandardMaterial({
    color: 0xff3333, // blue
	flatShading: true
  });

  pawnEMat.color.convertSRGBToLinear();

  return {
    boardMat,
    pawnPMat,
	pawnEMat
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
  event.preventDefault();

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  rcPawn = [];
  rcCaptured = [];
 
  rcBlock = [];	
  for(var i=0;i<board.length;i++){
	rcBlock.push(board[i].object);
  }
  
  // console.log("Player turn: " + playerTurn);
  
  if(playerTurn){
	for(var i=0;i<pawn.length;i++){
		if(pawn[i].isPlayer){
			rcPawn.push(pawn[i].object);
		}
	}
	
	for(var i=0;i<capturedByP.length;i++){
		rcCaptured.push(capturedByP[i].object);
	}
	
  }else{
	for(var i=0;i<pawn.length;i++){
		if(!pawn[i].isPlayer){
			rcPawn.push(pawn[i].object);
		}
	}
	
	for(var i=0;i<capturedByE.length;i++){
		rcCaptured.push(capturedByE[i].object);
	}
  }
  
  if(selectedCaptured.length>0){
	// Place Captured Pawn
    var intersectBlock = raycaster.intersectObjects(rcBlock);
	var selectedBlock = [];
	
	if (intersectBlock.length > 0) {
		for(var i=0;i<board.length;i++){
			if(intersectBlock[0].object == board[i].object){
				selectedBlock.push(board[i]);
				// console.log("selected block (to place captured pawn) pos: " + board[i].positionX + ", " + board[i].positionY);
				break;
			}
		}
		
		if(selectedBlock[0].isFilled){
			selectedCaptured = [];
			console.log("block is filled");
		} else{
			// Select player' capture
			if(selectedCaptured[0].positionY == 0){
				if(selectedBlock[0].positionY != 4){
					for(var x=0;x<jail.length;x++){
						if(selectedCaptured[0].object.position.x == jail[x].object.position.x && selectedCaptured[0].object.position.z == jail[x].object.position.z){
							jail[x].isFilled = false;
							break;
						}
					}
					
					selectedCaptured[0].object.position.set(
									selectedBlock[0].object.position.x,
									selectedCaptured[0].object.position.y,
									selectedBlock[0].object.position.z
									);
					
					selectedCaptured[0].positionX = selectedBlock[0].positionX;
					selectedCaptured[0].positionY = selectedBlock[0].positionY;
					
					// console.log("selected captured pawn: " + selectedCaptured[0].positionX + ", " + selectedCaptured[0].positionY);
					
					pawn.push(selectedCaptured[0]);
					
					capturedByP = capturedByP.filter(function(value, index, arr){
						return value != selectedCaptured[0];						
					});
					
					if(playerTurn){
						playerTurn = false;
						console.log("Player moved captured pawn. is next player turn? " + playerTurn);
					}else{ 
						playerTurn = true;
						console.log("Enemy moved captured pawn. is next player turn? " + playerTurn);
					}
					selectedBlock[0].isFilled = true;
				} else{
					console.log("Maiden can't be placed at enemy's castle!");
				}
				
			}
			// Select enemy' capture
			else{
				if(selectedBlock[0].positionY != 1){
					for(var x=0;x<jail.length;x++){
						if(selectedCaptured[0].object.position.x == jail[x].object.position.x && selectedCaptured[0].object.position.z == jail[x].object.position.z){
							jail[x].isFilled = false;
							break;
						}
					}
					
					selectedCaptured[0].object.position.set(
									selectedBlock[0].object.position.x,
									selectedCaptured[0].object.position.y,
									selectedBlock[0].object.position.z
									);
					
					selectedCaptured[0].positionX = selectedBlock[0].positionX;
					selectedCaptured[0].positionY = selectedBlock[0].positionY;
					
					// console.log("selected captured pawn: " + selectedCaptured[0].positionX + ", " + selectedCaptured[0].positionY);
					
					pawn.push(selectedCaptured[0]);
					
					capturedByE = capturedByE.filter(function(value, index, arr){
						return value != selectedCaptured[0];						
					});
					
					
					if(playerTurn){
						playerTurn = false;
						console.log("Player moved captured pawn. is next player turn? " + playerTurn);
					}else{ 
						playerTurn = true;
						console.log("Enemy moved captured pawn. is next player turn? " + playerTurn);
					}
					
					selectedBlock[0].isFilled = true;
					selectedBlock = [];
				} else{
					console.log("Maiden can't be placed at player's castle!");
				}
			}
			
		}
	} 
	
	selectedCaptured = [];
	selectedBlock = [];
	
	
  }
  else {
	var intersectCaptured = raycaster.intersectObjects(rcCaptured);
	// Add captured pawn as the selected pawn to be moved
	if (intersectCaptured.length > 0) {
		for(var x = 0;x<capturedByP.length;x++){
			if(capturedByP[x].object == intersectCaptured[0].object){
				selectedCaptured.push(capturedByP[x]);
				break;
			}
		}
		
		for(var x = 0;x<capturedByE.length;x++){
			if(capturedByE[x].object == intersectCaptured[0].object){
				selectedCaptured.push(capturedByE[x]);
				break;
			}
		}
		
		console.log("selected captured pawn: " + selectedCaptured[0].type);
	} 
	else {
		selectedCaptured = [];
		if (selectedPawn.length > 0) {
			// console.log("selected pawn: " + selectedPawn[0].type)
			var intersectBlock = raycaster.intersectObjects(rcBlock);
			var selectedBlock = [];
		
			if (intersectBlock.length > 0) {
				for(var i=0;i<board.length;i++){
					if(intersectBlock[0].object == board[i].object){
						selectedBlock.push(board[i]);
						// console.log("selected block pos: " + board[i].positionX + ", " + board[i].positionY);
					}
				}
		
				var x, y;
				xFrom = selectedPawn[0].positionX;
				yFrom = selectedPawn[0].positionY;
				xTo = selectedBlock[0].positionX;
				yTo = selectedBlock[0].positionY;
				
				// console.log(xFrom +"; "+yFrom+"; "+xTo+"; "+yTo);
							
				if(isValidMove(xFrom, yFrom, xTo, yTo, selectedPawn[0])){
					// Capturing pawn stuffs code will goes here
					if(selectedBlock[0].isFilled){
						var blockHasPawnP = false;
						var capturedPawn;
						for(var x=0;x<pawn.length;x++){
							if((pawn[x].positionX == selectedBlock[0].positionX)&&(pawn[x].positionY == selectedBlock[0].positionY)){
								if(pawn[x].isPlayer){
									blockHasPawnP = true;
								}
								capturedPawn = pawn[x];
								break;
							}	
						}
				
						if(selectedPawn[0].isPlayer){	
							if(blockHasPawnP){
								// Invalid move
								console.log("Invalid move " + selectedPawn[0].object);
							}
							// Player can capture Enemy's pawn
							else{
								for(var j=0;j<12;j++){
									if((board[j].positionX == selectedPawn[0].positionX)&&(board[j].positionY == selectedPawn[0].positionY)){
										board[j].isFilled = false;
										break;
									}
								}
					
								// Maiden arrived at opposite's castle
								if(((selectedPawn[0].type === "maiden" && selectedPawn[0].isPlayer) && (selectedBlock[0].positionY == 4))||((selectedPawn[0].type === "maiden" && !selectedPawn[0].isPlayer) && (selectedBlock[0].positionY == 1))){
									selectedPawn[0].type = "enchanted";
								}
								
								// Move the selected pawn
								selectedPawn[0].object.position.set(
								selectedBlock[0].object.position.x,
								selectedPawn[0].object.position.y,
								selectedBlock[0].object.position.z
								);
								
								selectedPawn[0].positionX = selectedBlock[0].positionX;
								selectedPawn[0].positionY = selectedBlock[0].positionY;
								// End of moving the pawn
								
								if(capturedPawn.type === "queen"){
									alert("You have captured enemy's Queen. You win!");
									location.reload();
								} else {
									pawn = pawn.filter(function(value, index, arr){
										return value != capturedPawn;						
									});
									
									
									const materials = createMaterials();
									const geometries = createGeometries();
									
									for(var x=0;x<jail.length;x++){
										if((!jail[x].isFilled) && (jail[x].isPlayer)){
											var capturedMesh = new THREE.Mesh(geometries.pawnMesh, materials.pawnPMat);
											capturedMesh.position.set(jail[x].object.position.x, capturedPawn.object.position.y, jail[x].object.position.z);
											
											scene.add(capturedMesh);
											
											jail[x].isFilled = true;
											break;
										}
									}
									
									if(capturedPawn.type === "enchanted"){
										capturedByP.push(new Piece("maiden", capturedMesh, capturedByP.length, 0, true));
									} else {
										capturedByP.push(new Piece(capturedPawn.type, capturedMesh, capturedByP.length, 0, true));
									}
									
								}
								
								
								if(playerTurn){
									playerTurn = false;
									console.log("Player captured enemy's pawn. is next player turn? " + playerTurn);
								}else{
									playerTurn = true;
									console.log("Enemy captured player's pawn. is next player turn? " + playerTurn);
								}
								
								scene.remove(capturedPawn.object);
								
							}
						} else{
							// Enemy can capture Player's pawn
							if(blockHasPawnP){
								for(var j=0;j<12;j++){
									if((board[j].positionX == selectedPawn[0].positionX)&&(board[j].positionY == selectedPawn[0].positionY)){
										board[j].isFilled = false;
										break;
									}
								}
					
								// Maiden arrived at opposite's castle
								if(((selectedPawn[0].type === "maiden" && !selectedPawn[0].isPlayer) && (selectedBlock[0].positionY == 4))||((selectedPawn[0].type === "maiden" && !selectedPawn[0].isPlayer) && (selectedBlock[0].positionY == 1))){
									selectedPawn[0].type = "enchanted";
								}
								
								// Move the selected pawn
								selectedPawn[0].object.position.set(
								selectedBlock[0].object.position.x,
								selectedPawn[0].object.position.y,
								selectedBlock[0].object.position.z
								);
								
								selectedPawn[0].positionX = selectedBlock[0].positionX;
								selectedPawn[0].positionY = selectedBlock[0].positionY;
								// End of moving the pawn
								
								if(capturedPawn.type === "queen"){
									alert("Enemy has captured your Queen! You lose.");
									location.reload();
								} else {
									pawn = pawn.filter(function(value, index, arr){
										return value != capturedPawn;						
									});
									
									
									const materials = createMaterials();
									const geometries = createGeometries();
									
									for(var x=0;x<jail.length;x++){
										if((!jail[x].isFilled) && (!jail[x].isPlayer)){
											var capturedMesh = new THREE.Mesh(geometries.pawnMesh, materials.pawnEMat);
											capturedMesh.position.set(jail[x].object.position.x, capturedPawn.object.position.y, jail[x].object.position.z);
									
											scene.add(capturedMesh);
											
											jail[x].isFilled = true;
											break;
										}
									}
									
									if(capturedPawn.type === "enchanted"){
										capturedByE.push(new Piece("maiden", capturedMesh, capturedByE.length, 5, false));
									} else{
										capturedByE.push(new Piece(capturedPawn.type, capturedMesh, capturedByE.length, 5, false));
									}
								}
								
								scene.remove(capturedPawn.object);
								
								if(playerTurn){
									playerTurn = false;
									console.log("Player captured enemy's pawn. is next player turn? " + playerTurn);
								}else{
									playerTurn = true;
									console.log("Enemy captured player's pawn. is next player turn? " + playerTurn);
								}
							}
							else{
								// Invalid move
								console.log("Invalid move " + selectedPawn[0].object);
							}
						}
						
					}
					// End of capturing stuffs
					
					// No pawn in the selected Block
					else{
						selectedBlock[0].isFilled = true;
				
						for(var j=0;j<12;j++){
							if((board[j].positionX == selectedPawn[0].positionX)&&(board[j].positionY == selectedPawn[0].positionY)){
								board[j].isFilled = false;
								break;
							}
						}
				
						// Maiden arrived at opposite's castle
						if(((selectedPawn[0].type === "maiden" && selectedPawn[0].isPlayer) && (selectedBlock[0].positionY == 4))||((selectedPawn[0].type === "maiden" && !selectedPawn[0].isPlayer) && (selectedBlock[0].positionY == 1))){
							selectedPawn[0].type = "enchanted";
						}
				
						// Move the selected pawn
						selectedPawn[0].object.position.set(
						selectedBlock[0].object.position.x,
						selectedPawn[0].object.position.y,
						selectedBlock[0].object.position.z
						);
						
						selectedPawn[0].positionX = selectedBlock[0].positionX;
						selectedPawn[0].positionY = selectedBlock[0].positionY;
						// End of moving the pawn
						
						// Win state: Quuen arrived at Enemy's Castle and no pawn can kill the Queen
						if(((selectedPawn[0].type === "queen" && selectedPawn[0].isPlayer) && (selectedBlock[0].positionY == 4))||((selectedPawn[0].type === "queen" && !selectedPawn[0].isPlayer) && (selectedBlock[0].positionY == 1))){
							if(selectedPawn[0].isPlayer){
								
								var validConquer = true;
						
								for(var x=1;x<pawn.length;x++){
									if(!pawn[x].isPlayer){
										if(isValidMove(pawn[x].positionX, pawn[x].positionY, selectedPawn[0].positionX, selectedPawn[0].positionY, pawn[x])){
											validConquer = false;
											break;
										}
									}
								}
						
								if(validConquer){
									alert("You have conquered enemy's castle. You win!");
									location.reload();
								}
							} else{
								var validConquer = true;
						
								for(var x=1;x<pawn.length;x++){
									if(pawn[x].isPlayer){
										if(isValidMove(pawn[x].positionX, pawn[x].positionY, selectedPawn[0].positionX, selectedPawn[0].positionY, pawn[x])){
											validConquer = false;
											break;
										}
									}
								}
						
								if(validConquer){
									alert("Enemy's Queen has conquered your castle! You lose");
									location.reload();
								}
							}
						}
						
						
						if(playerTurn){
							playerTurn = false;
							console.log("Player moved pawn. is next player turn? " + playerTurn);
						}else{
							playerTurn = true;
							console.log("Enemy moved pawn. is next player turn? " + playerTurn);
						}
						
					}	
						
					selectedPawn.pop();
					selectedBlock.pop();
				
				} else{
					console.log("Invalid Move pawn [" +selectedPawn[0]+"]");
				}	
				
				selectedPawn = [];
				
			}
		}
		// There is no pawn selected yet
		else {
			
			var intersectPawn = raycaster.intersectObjects(rcPawn);
			
			if (intersectPawn.length > 0){
				for(var i=0;i<pawn.length;i++){
					if(intersectPawn[0].object == pawn[i].object){
						selectedPawn.push(pawn[i]);
						// console.log("selected pawn pos: " + pawn[i].positionX + ", " + pawn[i].positionY);
						break;
					}
				}
				
				console.log("selected pawn: " + selectedPawn[0].type);
			} else{
				selectedPawn = [];
			}
		}
	}
  }
  updateState();
}

init();
window.addEventListener("resize", onWindowResize);
window.addEventListener("mousedown", onDocumentMouseDown, false);
