// import { Matrix } from "./Classes/Matrix.js";
import { Camera } from "./Classes/CameraFPS.js";
import { Cube } from "./Classes/Cube.js";
import { Cylinder3D } from "./Classes/Cylinder.js";
import { DynamicGrid } from "./Classes/DynamicGrid.js";
import { Grid3D } from "./Classes/Grid.js";
import { Object3D } from "./Classes/Object.js";
import { UV_Sphere3D } from "./Classes/UV_Sphere.js";


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
  




const CAMERA = new Camera();
CAMERA.setTranslation([0,0,-15])

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
    x = x*z/15;
    y = y*z/15;

  }

  const screenX = (x + 1) * WIDTH / 2;
  const screenY = (1 - y) * HEIGHT / 2;


  return [screenX, screenY, 1];
}


const point =(v)=>{
  const [x,y,z] = v;
  context.beginPath();
  context.fillStyle = "#000000";
  context.arc(x, y, 2, 0, 2 * Math.PI)
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
  context.moveTo(WIDTH/2-15,HEIGHT/2);
  context.lineTo(WIDTH/2+15,HEIGHT/2);
  context.moveTo(WIDTH/2,HEIGHT/2-15);
  context.lineTo(WIDTH/2,HEIGHT/2+15);
  context.strokeStyle="#ff0000";
  context.stroke();
  context.closePath();
}


const clearCanvas = ()=>{
  context.clearRect(0,0,WIDTH, HEIGHT);
}

const p = [600,600,10];



const transform= (point, obj, camera )=>{
  const pos = obj.getPosition();
  const scale = obj.getScale();
  let p = rotatePoint([point[0]*scale[0],point[1]*scale[1],point[2]*scale[2]], obj.getRotation());

  p[0] +=  pos[0];
  p[1] +=  pos[1];
  p[2] +=  pos[2]; 
  
  const CT =  camera.getTranslation();
  p[0] -= CT[0];
  p[1] -= CT[1];
  p[2] -= CT[2];
  
  let CR = camera.getRotation();
  p = rotatePoint(p, [-CR[0], -CR[1], -CR[2]] );

  // project(p);
  return p;
}



const cube3D = new Cube("cube");
// cube3D.setPosition([0,0,25]) ;
cube3D.setScale([2.5,2.5,2.5])

const cube3D2 = new Cube("cube");
cube3D2.setPosition([30,0,10]) ;
cube3D2.setScale([2.5,2.5,5.5])


const grid3D = new Grid3D("grid", 50, 50, 1.5, 1.5);
grid3D.setPosition([0,-20,0])
// grid3D.setScale([0.2,0.2,0.2]);

const sphere1 = new UV_Sphere3D("sphere", 8, 4*8, 8*4);
sphere1.setPosition([20,0,25]);
sphere1.rotate([0,0,-0.4059635840138811])

const cylinder1 = new Cylinder3D("Cylinder", 5, 8, 14);
cylinder1.setPosition([30.1,3,-16]);

const cylinder2 = new Cylinder3D("Cylinder", 6, 32, 16);
cylinder2.setPosition([-18,0,25]);



function smoothstep(min, max, x) {
  x = Math.max(0, Math.min(1, (x - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

const blackHole = (x,y,dx,dy, scale, maxRadius, time=0)=>{
  if(time < 0) return 0;
  const r = (x-dx)*(x-dx) + (y-dy)*(y-dy)
  return -scale/( r ) *smoothstep(1, maxRadius, time)*Math.log(time);
}


const waves = (x,y,dx, dy, scale, smooth, time=0, innerWaves, max = 100)=>{
  const r= Math.sqrt( (x-dx)*(x-dx) + (y-dy)*(y-dy)   );
  return Math.sin(r/smooth+(innerWaves?-1:1)*time )*scale* ( Math.pow(Math.E, -r/time*max)  );
  
}
const saddle = (x,y, s)=>{
  return y*y/s-x*x/s;
}
const mountain_chains = (x,y,z, t=0)=>{
  return Math.cos(x)-Math.sin(z);
}


const fx = (x,y,z, t=0)=>{  return x; }
// const fy = (x,y,z, t=0)=>{waves(x,z,0, 0, 0.4, 0.2, t*500, false, 10) } 


// WATER: waves(x,z,0, 0, 0.2, 0.2, t*300, true, 10)
// BLACK HOLE PULSE: waves(x,z,0, 0, 0.4, 0.2, t*500, false, 10)

// BLACK HOLE: blackHole(x,z,0,0, 12, 10, t*200-50)

const fy = (x,y,z, t=0)=>{ 
  return waves(x,z,0, 0, 0.2, 0.2, t*300, true, 10)
  
  } // waves(x,z,0, 0, 10, 10, t) //  waves(x,z,0, 0, 1, 0.2, t, 10)

const fz = (x,y,z, t=0)=>{  return z } // blackHole(x,z,0,0, 150)




const dynaGrid = new DynamicGrid("dynamicGrid", 100, 0.25,0.25, fx, fy, fz);
dynaGrid.setPosition([0,-5,15])

const IS_DEBUG_MODE = 0*true;
// cube3D.setPosition([0,0,15])
// const OBJECTS = [cube3D,  grid3D];

const AXIS = new Object3D("AXIS");
AXIS.createPoint([0,0,0]);
AXIS.createPoint([1.8,0,0]);
AXIS.createPoint([0,1.8,0]);
AXIS.createPoint([0,0,1.8]);

AXIS.createPoint([1,-1,2]);
AXIS.createPoint([-1,-1,2]);
AXIS.createPoint([1,1,2]);
AXIS.createPoint([-1,1,2]);

AXIS.createFace([4,5,6,7,6,5,4]);


AXIS.createPoint([2,1,1]);
AXIS.createPoint([2,-1,-1]);
AXIS.createPoint([2,1,-1]);
AXIS.createPoint([2,-1,1]);

AXIS.createFace([8,9]);
AXIS.createFace([10,11]);

AXIS.createPoint([0,2,0]);
AXIS.createPoint([0,3,0]);
AXIS.createPoint([0.25,4,0.25]);
AXIS.createPoint([-0.25,4,-0.25]);

AXIS.createFace([12,13,14,13,15,13]);



AXIS.createFace([0,1]);
AXIS.createFace([0,2]);
AXIS.createFace([0,3]);

AXIS.setScale([0.3,0.3,0.3])
// cube3D

// const OBJECTS = [AXIS, cube3D];

const OBJECTS = [AXIS, cube3D,  grid3D, sphere1, cylinder2];
// const OBJECTS = [AXIS,  cube3D, dynaGrid, sphere1, cylinder1];
// const OBJECTS = [dynaGrid];

let deltaTime = 0;

const time = ()=>{
  physics();
  deltaTime++;
  clearCanvas()
  // showGrid();
  

  OBJECTS.forEach(obj=>{
    const processedPoints = [];
    // if(obj == grid3D) console.log(grid3D);
    obj.getAllPoints(deltaTime/1000).forEach(p=>{
      const pointr = transform(p, obj, CAMERA); 
      if(pointr[2] <= 0) pointr[2] = 0.0001;
      processedPoints.push( project(pointr) );
      if(IS_DEBUG_MODE) point(project(pointr))

    });

    
    
    obj.getAllFaces().forEach(face=>{
        const n = face.length;
      for(let i = 0; i < n;i++){
        line( processedPoints[face[i]], processedPoints[face[(i+1)%n]]);
        // point(processedPoints[face[i]])
      }
    });
  });


  sphere1.rotate([0, 0.01, 0]);
  // cube3D.setPosition([0, Math.sin(deltaTime/25)*2,2.75]);  
  // cube3D2.rotate([0,0.01,0]);// += 0.01;
  // cylinder1.rotate([0.005,0.01,0.001])
  cylinder2.setScale([1, (Math.sin(deltaTime/30)/2+1),1]);

  showAim();
  // grid3D.rotate([0,0.01,0]);// += 0.01;
  requestAnimationFrame(time);
}
// cube3D.setPosition([0,0,2.75]);




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
  
    const newRot = [a, rot[1]+yawDelta, rot[2]];
    CAMERA.setRotation(newRot);
  }
});


window.addEventListener('keydown', (e)=>{
  KEYS[e.key.toLocaleLowerCase()] = true;
  if(e.key.toLocaleLowerCase()=='y') ISO = !ISO;
  
})
window.addEventListener('keyup', (e)=>{
  KEYS[e.key.toLocaleLowerCase()] = false;
})

const vel = 1.2;
const physics = () => {
  const vx = vel*(KEYS['a'] ? -0.1 : KEYS['d'] ? 0.1 : 0);
  const vy = vel*(KEYS['q'] ? -0.1 : KEYS['e'] ? 0.1 : 0);
  const vz = vel*(KEYS['w'] ? 0.1 : KEYS['s'] ? -0.1 : 0);

  const rot = CAMERA.getRotation();
  let vx_l = rotateY([vx,0,0], rot[1]);
  let vz_l = rotateY(rotateX([0,0,vz], rot[0]), rot[1]);


  const move = [
    vx_l[0]+vz_l[0],
    vx_l[1]+vz_l[1]+vy,
    vx_l[2]+vz_l[2],
  ];
  CAMERA.translate(move);

}


document.querySelector(".loading").classList.add("hidden");

// setInterval(()=>{
  time();

// }, 1000/60)