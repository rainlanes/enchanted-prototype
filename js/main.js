// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;
let mesh;

function init() {

  container = document.querySelector( '#game-container' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x1F262A );

  createCamera();
  createControls();
  createLights();
  createMeshes();
  createRenderer();

  // start the animation loop
  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function createCamera() {

  camera = new THREE.PerspectiveCamera(
    35, // FOV
    container.clientWidth / container.clientHeight, // aspect
    0.1, // near clipping plane
    100, // far clipping plane
  );

  camera.position.set( -7, 12, -11 );

}

function createControls() {

  controls = new THREE.OrbitControls( camera, container );

}

function createLights() {

  const ambientLight = new THREE.HemisphereLight(
    0xddeeff, // sky color
    0x202020, // ground color
    5, // intensity
  );

  const mainLight = new THREE.DirectionalLight( 0xffffff, 5 );
  mainLight.position.set( 10, 10, 10 );

  scene.add( ambientLight, mainLight );

}

function createMaterials() {

  const board = new THREE.MeshStandardMaterial( {
    color: 0xE6E0D4, // white
    flatShading: true,
  } );

  // just as with textures, we need to put colors into linear color space
  board.color.convertSRGBToLinear();

  const pawnPlayer = new THREE.MeshStandardMaterial( {
    color: 0xff3333, // red
    flatShading: true,
  } );

  pawnPlayer.color.convertSRGBToLinear();
  
  const pawnEnemy = new THREE.MeshStandardMaterial( {
    color: 0x33ffff, // blue
    flatShading: true,
  } );

  pawnEnemy.color.convertSRGBToLinear();

  return {

    board,
    pawnPlayer,
	pawnEnemy

  };

}

function createGeometries() {

  const block = new THREE.BoxBufferGeometry( 2, 0.25, 2 );

  // we can reuse a single cylinder geometry for all 4 wheels
  const pawn = new THREE.CylinderBufferGeometry( 0.4, 0.4, 1.75, 10 );


  return {
    block,
    pawn
  };

}

function createMeshes() {

  // create a Group to hold the pieces of the train
  const board = new THREE.Group();
  scene.add( board );

  const materials = createMaterials();
  const geometries = createGeometries();

  const block1 = new THREE.Mesh( geometries.block, materials.board );
  block1.position.set( -2.6, 0.2, 0 );

  const block2 = new THREE.Mesh( geometries.block, materials.board );
  block2.position.set( -0.54, 0.25, 0 );
  
  const block3 = new THREE.Mesh( geometries.block, materials.board );
  block3.position.set( 1.56, 0.22, 0 );
  
  const block4 = new THREE.Mesh( geometries.block, materials.board );
  block4.position.set( -2.6, 0.21, 2.1 );
  
  const block5 = new THREE.Mesh( geometries.block, materials.board );
  block5.position.set( -0.55, 0.2, 2.1 );
  
  const block6 = new THREE.Mesh( geometries.block, materials.board );
  block6.position.set( 1.5, 0.22, 2.1 );
  
 const block7 = new THREE.Mesh( geometries.block, materials.board );
  block7.position.set( -2.6, 0.25, 4.2 );
  
  const block8 = new THREE.Mesh( geometries.block, materials.board );
  block8.position.set( -0.56, 0.22, 4.2 );
  
  const block9 = new THREE.Mesh( geometries.block, materials.board );
  block9.position.set( 1.5, 0.2, 4.2 );

  const block10 = new THREE.Mesh( geometries.block, materials.board );
  block10.position.set( -2.6, 0.21, 6.3 );
  
  const block11 = new THREE.Mesh( geometries.block, materials.board );
  block11.position.set( -0.55, 0.2, 6.3 );

  const block12 = new THREE.Mesh( geometries.block, materials.board );
  block12.position.set( 1.5, 0.22, 6.3 );
  
  board.add(

    block1,
	block2,
	block3,
	block4,
	block5,
	block6,
	block7,
	block8,
	block9,
	block10,
	block11,
	block12

  );

  // create a Group to hold the pieces of the train
  const defPawns = new THREE.Group();
  scene.add( defPawns );

  const pawn1 = new THREE.Mesh( geometries.pawn, materials.pawnPlayer );
  pawn1.position.set( -2.5, 1.26, 0 );

  const pawn2 = new THREE.Mesh( geometries.pawn, materials.pawnPlayer );
  pawn2.position.set( -0.54, 1.26, 0 );
  
  const pawn3 = new THREE.Mesh( geometries.pawn, materials.pawnPlayer );
  pawn3.position.set( 1.56, 1.26, 0 );
  
  const pawn4 = new THREE.Mesh( geometries.pawn, materials.pawnPlayer );
  pawn4.position.set( -0.54, 1.26, 2.1 );
  
  const pawn5 = new THREE.Mesh( geometries.pawn, materials.pawnEnemy );
  pawn5.position.set( -2.5, 1.26, 6.3 );

  const pawn6 = new THREE.Mesh( geometries.pawn, materials.pawnEnemy );
  pawn6.position.set( -0.54, 1.26, 6.3 );
  
  const pawn7 = new THREE.Mesh( geometries.pawn, materials.pawnEnemy );
  pawn7.position.set( 1.56, 1.26, 6.3 );
  
  const pawn8 = new THREE.Mesh( geometries.pawn, materials.pawnEnemy );
  pawn8.position.set( -0.54, 1.26, 4.2 );
	
  defPawns.add(

    pawn1,
	pawn2,
	pawn3,
	pawn4,
	pawn5,
	pawn6,
	pawn7,
	pawn8

  );
}

function createRenderer() {

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( container.clientWidth, container.clientHeight );

  renderer.setPixelRatio( window.devicePixelRatio );

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  renderer.physicallyCorrectLights = true;

  container.appendChild( renderer.domElement );

}

// perform any updates to the scene, called once per frame
// avoid heavy computation here
function update() {

  // Don't delete this function!

}

// render, or 'draw a still image', of the scene
function render() {

  renderer.render( scene, camera );

}

// a function that will be called every time the window gets resized.
// It can get called a lot, so don't put any heavy computation in here!
function onWindowResize() {

  // set the aspect ratio to match the new browser window aspect ratio
  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  // update the size of the renderer AND the canvas
  renderer.setSize( container.clientWidth, container.clientHeight );

}

window.addEventListener( 'resize', onWindowResize );

// call the init function to set everything up
init();
