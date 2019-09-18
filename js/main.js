// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;

let mesh;
let mesh2;

let pawn1;
let pawn2;
let pawn3;
let pawn4;
let pawn5;
let pawn6;
let pawn7;
let pawn8;
let blockMesh1;
let blockMesh2;
let blockMesh3;
let blockMesh4;
let blockMesh5;
let blockMesh6;
let blockMesh7;
let blockMesh8;
let blockMesh9;
let blockMesh10;
let blockMesh11;
let blockMesh12;

let raycaster;
let mouse;

var selectedPawn = [];

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
  block11 = new Block(1, 1, "block11", true);
  block12 = new Block(1, 2, "block12", false);
  block13 = new Block(1, 3, "block13", false);
  block14 = new Block(1, 4, "block14", true);

  block21 = new Block(2, 1, "block21", true);
  block22 = new Block(2, 2, "block22", true);
  block23 = new Block(2, 3, "block23", true);
  block24 = new Block(2, 4, "block24", true);

  block31 = new Block(3, 1, "block31", true);
  block32 = new Block(3, 2, "block32", false);
  block33 = new Block(3, 3, "block33", false);
  block34 = new Block(3, 4, "block34", true);
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

  camera.position.set(-7, 12, -11);
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
  const board = new THREE.MeshStandardMaterial({
    color: 0xe6e0d4, // white
    flatShading: true
  });

  // just as with textures, we need to put colors into linear color space
  board.color.convertSRGBToLinear();

  const pawnMat1 = new THREE.MeshStandardMaterial({
    color: 0xff3333, // red
    flatShading: true
  });

  pawnMat1.color.convertSRGBToLinear();

  const pawnMat2 = new THREE.MeshStandardMaterial({
    color: 0xff3333, // red
    flatShading: true
  });

  pawnMat2.color.convertSRGBToLinear();

  const pawnMat3 = new THREE.MeshStandardMaterial({
    color: 0xff3333, // red
    flatShading: true
  });

  pawnMat3.color.convertSRGBToLinear();

  const pawnMat4 = new THREE.MeshStandardMaterial({
    color: 0xff3333, // red
    flatShading: true
  });

  pawnMat4.color.convertSRGBToLinear();

  const pawnMat5 = new THREE.MeshStandardMaterial({
    color: 0x33ffff, // blue
    flatShading: true
  });

  pawnMat5.color.convertSRGBToLinear();

  const pawnMat6 = new THREE.MeshStandardMaterial({
    color: 0x33ffff, // blue
    flatShading: true
  });

  pawnMat6.color.convertSRGBToLinear();

  const pawnMat7 = new THREE.MeshStandardMaterial({
    color: 0x33ffff, // blue
    flatShading: true
  });

  pawnMat7.color.convertSRGBToLinear();

  const pawnMat8 = new THREE.MeshStandardMaterial({
    color: 0x33ffff, // blue
    flatShading: true
  });

  pawnMat8.color.convertSRGBToLinear();

  return {
    board,
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
  const pawn = new THREE.CylinderBufferGeometry(0.4, 0.4, 1.75, 10);

  return {
    blockMesh,
    pawn
  };
}

function createMeshes() {
  // create a Group to hold the pieces of the train
  const board = new THREE.Group();
  scene.add(board);

  const materials = createMaterials();
  const geometries = createGeometries();

  blockMesh1 = new THREE.Mesh(geometries.blockMesh, materials.board);
  blockMesh1.name.set("block11");
  blockMesh1.position.set(-2.6, 0.21, 6.3);

  blockMesh2 = new THREE.Mesh(geometries.blockMesh, materials.board);
  blockMesh2.name.set("block12");
  blockMesh2.position.set(-0.55, 0.2, 6.3);

  blockMesh3 = new THREE.Mesh(geometries.blockMesh, materials.board);
  blockMesh3.name.set("block13");
  blockMesh3.position.set(1.5, 0.22, 6.3);

  blockMesh4 = new THREE.Mesh(geometries.blockMesh, materials.board);
  blockMesh4.name.set("block21");
  blockMesh4.position.set(-2.6, 0.25, 4.2);

  blockMesh5 = new THREE.Mesh(geometries.blockMesh, materials.board);
  blockMesh5.name.set("block22");
  blockMesh5.position.set(-0.56, 0.22, 4.2);

  blockMesh6 = new THREE.Mesh(geometries.blockMesh, materials.board);
  blockMesh6.name.set("block23");
  blockMesh6.position.set(1.5, 0.2, 4.2);

  blockMesh7 = new THREE.Mesh(geometries.blockMesh, materials.board);
  blockMesh7.name.set("block31");
  blockMesh7.position.set(-2.6, 0.21, 2.1);

  blockMesh8 = new THREE.Mesh(geometries.blockMesh, materials.board);
  blockMesh8.name.set("block32");
  blockMesh8.position.set(-0.55, 0.2, 2.1);

  blockMesh9 = new THREE.Mesh(geometries.blockMesh, materials.board);
  blockMesh9.name.set("block33");
  blockMesh9.position.set(1.5, 0.22, 2.1);

  blockMesh10 = new THREE.Mesh(geometries.blockMesh, materials.board);
  blockMesh10.name.set("block41");
  blockMesh10.position.set(-2.6, 0.2, 0);

  blockMesh11 = new THREE.Mesh(geometries.blockMesh, materials.board);
  blockMesh11.name.set("block42");
  blockMesh11.position.set(-0.54, 0.25, 0);

  blockMesh12 = new THREE.Mesh(geometries.blockMesh, materials.board);
  blockMesh12.name.set("block43");
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

  pawn1 = new THREE.Mesh(geometries.pawn, materials.pawnMat1);
  pawn1.name.set("board11");
  pawn1.position.set(-2.5, 1.26, 6.3);

  pawn2 = new THREE.Mesh(geometries.pawn, materials.pawnMat2);
  pawn2.name.set("board12");
  pawn2.position.set(-0.54, 1.26, 6.3);

  pawn3 = new THREE.Mesh(geometries.pawn, materials.pawnMat3);
  pawn3.name.set("board13");
  pawn3.position.set(1.56, 1.26, 6.3);

  pawn4 = new THREE.Mesh(geometries.pawn, materials.pawnMat4);
  pawn4.name.set("board22");
  pawn4.position.set(-0.54, 1.26, 4.2);

  pawn5 = new THREE.Mesh(geometries.pawn, materials.pawnMat5);
  pawn5.name.set("board14");
  pawn5.position.set(-2.5, 1.26, 0);

  pawn6 = new THREE.Mesh(geometries.pawn, materials.pawnMat6);
  pawn6.name.set("board24");
  pawn6.position.set(-0.54, 1.26, 0);

  pawn7 = new THREE.Mesh(geometries.pawn, materials.pawnMat7);
  pawn7.name.set("board34");
  pawn7.position.set(1.56, 1.26, 0);

  pawn8 = new THREE.Mesh(geometries.pawn, materials.pawnMat8);
  pawn8.name.set("board23");
  pawn8.position.set(-0.54, 1.26, 2.1);

  defPawns.add(pawn1, pawn2, pawn3, pawn4, pawn5, pawn6, pawn7, pawn8);
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
          if (!boardArr[i].isFilled) {
            selectedPawn[0].position.set(
              intersects2[0].object.position.x,
              selectedPawn[0].position.y,
              intersects2[0].object.position.z
            );

            boardArr[i].isFilled.set(true);
            scene.getObjectByName(selectedPawn[0].name).isFilled.set(false);
            selectedPawn[0].name.set(boardArr[i].name);

            console.log("moved pawn to " + selectedPawn[0].name);
          } else {
            alert("is filled");
          }
        }
      }
    }

    selectedPawn = [];
    setDefaultColor();
  }
  // There is no pawn selected yet
  else {
    mesh = [pawn1, pawn2, pawn3, pawn4, pawn5, pawn6, pawn7, pawn8]; // three.js objects with click handlers we are interested in

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
  pawn1.material.color.set(0xff0000);
  pawn2.material.color.set(0xff0000);
  pawn3.material.color.set(0xff0000);
  pawn4.material.color.set(0xff0000);

  pawn5.material.color.set(0x33ffff);
  pawn6.material.color.set(0x33ffff);
  pawn7.material.color.set(0x33ffff);
  pawn8.material.color.set(0x33ffff);
}

init();
window.addEventListener("resize", onWindowResize);
window.addEventListener("mousedown", onDocumentMouseDown, false);
