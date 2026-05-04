// import { Matrix } from "./Matrix.js";



const cube = {
  POSITION: [0,0,10],
  ROTATE: [0,0,0],
  POINTS: [
    [1,1,-1],
    [1,-1, -1],
    [-1,1, -1],
    [-1,-1, -1],
    [1,1, 1],
    [1,-1, 1],
    [-1,1, 1],
    [-1,-1, 1],
  ],
  LINES:[
    [0, 1],[0,2],[3,1],[3,2], [4,5],[4,6],[7,5],[7,6],[0,4],[1,5],[2,6],[3,7]
  ],
  FACES: [
    [0,1,3,2],
    [0,1,2],
    [4,5,7,6],
    [0,1,5,4],
    [0,2,6,4],
    [3,1,5,7],
    [3,2,6,7],
  ]
}
  


class Camera{
  #translate = [0,0,0];
  #rotate = [0,0,0];

  setRotation(rotation){
    this.#rotate = rotation;
  }
  getRotation(){ return this.#rotate}

  rotate(rotate){
    this.#rotate[0] += rotate[0];
    this.#rotate[1] += rotate[1];
    this.#rotate[2] += rotate[2];
  }

  setTranslation(translate){
    this.#translate= translate;
  }
  getTranslation(){ return this.#translate}

  translate(translate){
    this.#translate[0] += translate[0];
    this.#translate[1] += translate[1];
    this.#translate[2] += translate[2];
  }

}

const CAMERA = new Camera();

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const HEIGHT = document.body.clientHeight; 
const WIDTH = document.body.clientWidth

canvas.height = HEIGHT;
canvas.width = WIDTH;

function rotateX([x,y,z], angle){
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
      x,
      y * c - z * s,
      y * s + z * c
  ];
}

function rotateY([x,y,z], angle){
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
      x * c + z * s,
      y,
      -x * s + z * c
  ];
}

function rotateZ([x,y,z], angle){
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
      x * c - y * s,
      x * s + y * c,
      z
  ];
}

const rotatePoint =( v,rotate)=>{
  let p = v;
  p = rotateY(p, rotate[1]);
  p = rotateX(p, rotate[0]);
  p = rotateZ(p, rotate[2]);
  return p
}



let ISO = false;

const project = (u)=>{
  let [x,y,z] = u;
  const aspect = WIDTH/HEIGHT;
  const fov = 90 * Math.PI / 180;
  const f = (1/Math.tan(fov/2));
  
  x = (x * f / aspect) / z;
  y = (y * f) / z;

  if(ISO){
    x = x*z/4;
    y = y*z/4;

  }

  const screenX = (x + 1) * WIDTH / 2;
  const screenY = (1 - y) * HEIGHT / 2;


  return [screenX, screenY, 1];
}


const point =(v)=>{
  const [x,y,z] = v;
  context.beginPath();
  context.fillStyle = "#000000";
  context.arc(x, y, 5, 0, 2 * Math.PI)
  context.fill();
  context.closePath();
}

const line = (v1,v2)=>{

  const [x1,y1,z1] = v1;
  const [x2,y2,z2] = v2;

  context.beginPath();
  context.moveTo(x1,y1);
  context.lineTo(x2,y2);
  context.strokeStyle="#000000";
  context.stroke();
  context.closePath();
}


const OBJS = [cube];

const showGrid = ()=>{
  context.beginPath();
  context.moveTo(WIDTH/2,0);
  context.lineTo(WIDTH/2,HEIGHT);
  context.moveTo(0,HEIGHT/2);
  context.lineTo(WIDTH,HEIGHT/2);
  context.strokeStyle="#000000";
  context.stroke();
  context.closePath();
}

const showAim = ()=>{
  context.beginPath();
  context.moveTo(WIDTH/2-50,HEIGHT/2);
  context.lineTo(WIDTH/2+50,HEIGHT/2);
  context.moveTo(WIDTH/2,HEIGHT/2-50);
  context.lineTo(WIDTH/2,HEIGHT/2+50);
  context.strokeStyle="#000000";
  context.stroke();
  context.closePath();
}


const clearCanvas = ()=>{
  context.clearRect(0,0,WIDTH, HEIGHT);
}

const p = [600,600,10];



const transform= (point, obj, camera )=>{
  let p = rotatePoint(point, obj.ROTATE);
  p[0] += obj.POSITION[0];
  p[1] += obj.POSITION[1];
  p[2] += obj.POSITION[2]; 
  
  const CT =  camera.getTranslation();
  p[0] -= CT[0];
  p[1] -= CT[1];
  p[2] -= CT[2];
  
  let CR = camera.getRotation();
  p = rotatePoint(p, [-CR[0], -CR[1], -CR[2]] );

  // project(p);
  return p;
}



const OBJECTS = [cube];

let deltaTime = 0;

const time = ()=>{
  physics();
  deltaTime++;
  clearCanvas()
  // showGrid();
  showAim();

  const processedPoints = [];
  OBJECTS.forEach(obj=>{
    
    
    obj.POINTS.forEach(p=>{
      const point = transform(p, obj, CAMERA); 
      if(point[2] <= 0) point[2] = 0.0001;

      processedPoints.push( project(point) );

    });

    
    
    obj.FACES.forEach(face=>{
        const n = face.length;
      for(let i = 0; i < n;i++){
        line( processedPoints[face[i]], processedPoints[face[(i+1)%n]]);
        point(processedPoints[face[i]])
      }
    });
  });



  cube.POSITION[1] = Math.sin(deltaTime/25)*2; 

  // cube.ROTATE[0] += 0.01;
  cube.ROTATE[1] += 0.01;
  // cube.ROTATE[2] += 0.01;
  // CAMERA.setTranslation([0,0,-3])
  // CAMERA.rotate([0,0.01,0])

  // cube.POSITION[0] = 1.5;
  requestAnimationFrame(time);
}
cube.POSITION[2] = 2.75;




const KEYS = {
  'w': false,
  's': false,
  'd': false,
  'a': false
}

let ismousedown = false;

canvas.addEventListener('click', ()=>{
  canvas.requestPointerLock();

})

window.addEventListener('mousedown', ()=>{
  ismousedown = true;
  document.body.style.cursor = "none";
  
})
window.addEventListener('mouseup', ()=>{
  ismousedown = false;
  document.body.style.cursor = "default";

})

window.addEventListener('mousemove', (e)=>{
  if(document.pointerLockElement){
      const pitchDelta = e.movementY * Math.PI / 180;
      const yawDelta = e.movementX * Math.PI / 180;
  
      const rot = CAMERA.getRotation();


      const limit = Math.PI / 2 - 0.01;
      const a = Math.max(-limit, Math.min(limit, rot[0]+pitchDelta));
  
      CAMERA.setRotation([a, rot[1]+yawDelta, rot[2]]);
  }
});


window.addEventListener('keydown', (e)=>{
  KEYS[e.key.toLocaleLowerCase()] = true;
  if(e.key.toLocaleLowerCase()=='y') ISO = !ISO;

})
window.addEventListener('keyup', (e)=>{
  KEYS[e.key.toLocaleLowerCase()] = false;
})
const physics = () => {
  const vx = KEYS['a'] ? -0.1 : KEYS['d'] ? 0.1 : 0;
  const vy = KEYS['q'] ? -0.1 : KEYS['e'] ? 0.1 : 0;
  const vz = KEYS['w'] ? 0.1 : KEYS['s'] ? -0.1 : 0;

  const rot = CAMERA.getRotation();

  if(vy) CAMERA.translate([0, vy, 0]);
  else{
    const move = rotatePoint([vx, 0, vz], [rot[0], rot[1], 0]);
    CAMERA.translate(move);
  }
}


document.querySelector(".loading").classList.add("hidden");
time();