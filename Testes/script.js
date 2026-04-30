const HEIGHT = window.innerHeight;
const WIDTH =  window.innerWidth;


const ORIGIN = {x: 0, y: 0, z: 1};
const POINTSIZE = 5;
const RENDERFACTOR = 5;

const canvas = document.querySelector("canvas");
const context = canvas.getContext('2d');

canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.border = "solid 1px black";
canvas.style.backgroundColor = "black";
canvas.style.backgroundColor = "black";

const SCALAR = 150;





const scene = {
  PIVOT: {x: 0, y: -2, z: 0},
  POINTS: [ 
    {x: 3, y: 0, z: 3},
    {x: 3, y: 0, z: 10},
    {x: 10, y: 0, z: 3},

    {x: 3, y: 0, z: -3},
    {x: 3, y: 0, z: -10},
    {x: 10, y: 0, z: -3},

    {x: -3, y: 0, z: -3},
    {x: -3, y: 0, z: -10},
    {x: -10, y: 0, z: -3},

    {x: -3, y: 0, z: 3},
    {x: -3, y: 0, z: 10},
    {x: -10, y: 0, z: 3},

    {x: 3, y: 3, z: 3},
    {x: 3, y: 3, z: 10},
    {x: 10, y: 3, z: 3},

    {x: 3, y: 3, z: -3},
    {x: 3, y: 3, z: -10},
    {x: 10, y: 3, z: -3},

    {x: -3, y: 3, z: -3},
    {x: -3, y: 3, z: -10},
    {x: -10, y: 3, z: -3},

    {x: -3, y: 3, z: 3},
    {x: -3, y: 3, z: 10},
    {x: -10, y: 3, z: 3},


  ], 
  LINES: [
    [0,3],[0,9],[0,1],[0,2],
    [3, 4], [3,5],
    [6,3],[6,9],[6,7],[6,8],
    [9,10], [9,11],

    [12,13],[12,14],
    [15,16], [15,17],
    [18,19],[18,20],
    [21,22], [21,23],


    [0,12],[1,13],[2,14],[3,15],[4,16],[5,17],[6,18]
    ,[7,19],[8,20],[9,21],[10,22],[11,23]

  ]


}







const cube = {
PIVOT: {x: 0,y: 0, z: 10},
POINTS: [{x: 1,y: 1, z: -1}, {x: 1,y: -1, z: -1},{x: -1,y: 1, z: -1}, {x: -1,y: -1, z: -1}, {x: 1,y: 1, z: 1}, {x: 1,y: -1, z: 1},{x: -1,y: 1, z: 1}, {x: -1,y: -1, z: 1}, ],
LINES:[
  [0, 1],[0,2],[3,1],[3,2], [4,5],[4,6],[7,5],[7,6],[0,4],[1,5],[2,6],[3,7]
],
FACES: [
  {F:[0,1,3,2],c:"#ff0000"},
  {F:[4,5,7,6],c:"#00ff00"},
  {F:[0,1,5,4],c:"#0000ff"},
  {F:[0,2,6,4],c:"#ffff00"},
  {F:[3,1,5,7],c:"#ff00ff"},
  {F:[3,2,6,7],c:"#00ffff"},


]


}


const teceract = {
  PIVOT: {x: 0,y: 0, z: -10},
  POINTS: [
    {x: 1,y: 1, z: -1}, {x: 1,y: -1, z: -1},{x: -1,y: 1, z: -1}, {x: -1,y: -1, z: -1}, {x: 1,y: 1, z: 1}, {x: 1,y: -1, z: 1},{x: -1,y: 1, z: 1}, {x: -1,y: -1, z: 1}, 
    {x: 0.5,y: 0.5, z: -0.5}, {x: 0.5,y: -0.5, z: -0.5},{x: -0.5,y: 0.5, z: -0.5}, {x: -0.5,y: -0.5, z: -0.5}, {x: 0.5,y: 0.5, z: 0.5}, {x: 0.5,y: -0.5, z: 0.5},{x: -0.5,y: 0.5, z: 0.5}, {x: -0.5,y: -0.5, z: 0.5}
  
  
  ],
  LINES:[
    [0, 1],[0,2],[3,1],[3,2], [4,5],[4,6],[7,5],[7,6],[0,4],[1,5],[2,6],[3,7],
    [8, 9],[8,10],[11,9],[11,10], [12,13],[12,14],[15,13],[15,14],[8,12],[9,13],[10,14],[11,15],
    [0, 8],[1,9],[2,10],[3,11], [4,12],[5,13],[6,14],[7,15]
  ],
  FACES: [
    {F:[0,1,3,2],c:"#ff0000"},
    {F:[4,5,7,6],c:"#00ff00"},
    {F:[0,1,5,4],c:"#0000ff"},
    {F:[0,2,6,4],c:"#ffff00"},
    {F:[3,1,5,7],c:"#ff00ff"},
    {F:[3,2,6,7],c:"#00ffff"},
  
  
  ]
  
  
  }



const pyramide = { 
  PIVOT: {x: 10, y: -2, z: 0}, 
  POINTS: [
    {x:  0, y: 1, z:  0}, 
    {x: -1, y: -1, z: -1},
    {x:  1, y:  -1, z: -1},
    {x:  1, y:  -1, z:  1},
    {x: -1, y:  -1, z:  1}  
  ],LINES:[
    [0, 1],[0,2],[0,3],[0,4], [2,1],[2,3],[4,1],[4,3]
  ],
  FACES: [
    {F: [1, 2, 3, 4], c: "#555555"},
    {F: [0, 1, 2],    c: "#ff0000"}, 
    {F: [0, 2, 3],    c: "#00ff00"}, 
    {F: [0, 3, 4],    c: "#0000ff"},
    {F: [0, 4, 1],    c: "#ffff00"} 
  ]
}

const sphere = {
  PIVOT: {x: -10,y: -2, z: 0},
  POINTS: [
    {x: 0, y: -1.2, z: 0},
    {x: 0, y: -1, z: 1},
    {x: 0.7, y: -1, z: 0.7},
    {x: 1, y: -1, z: 0},
    {x: 0.7, y: -1, z: -0.7},
    {x: 0, y: -1, z: -1},
    {x: -0.7, y: -1, z: -0.7},
    {x: -1, y: -1, z: 0},
    {x: -0.7, y: -1, z: 0.7},

    {x: 0, y: -0.3, z: 2},
    {x: 1.5, y: -0.3, z: 1.5},
    {x: 2, y: -0.3, z: 0},
    {x: 1.5, y: -0.3, z: -1.5},
    {x: 0, y: -0.3, z: -2},
    {x: -1.5, y: -0.3, z: -1.5},
    {x: -2, y: -0.3, z: 0},
    {x: -1.5, y: -0.3, z: 1.5},

    
    {x: 0, y: 0.5, z: 3},
    {x: 2.1, y:0.5, z: 2.1},
    {x: 3, y: 0.5, z: 0},
    {x: 2.1, y: 0.5, z: -2.1},
    {x: 0, y:0.5, z: -3},
    {x: -2.1, y: 0.5, z: -2.1},
    {x: -3, y: 0.5, z: 0},
    {x: -2.1, y: 0.5, z: 2.1},

    {x: 0, y: 1.5, z: 3.3},
    {x: 2.4, y:1.5, z: 2.4},
    {x: 3.3, y: 1.5, z: 0},
    {x: 2.4, y: 1.5, z: -2.4},
    {x: 0, y:1.5, z: -3.3},
    {x: -2.4, y: 1.5, z: -2.4},
    {x: -3.3, y: 1.5, z: 0},
    {x: -2.4, y: 1.5, z: 2.4},
    
    {x: 0, y: 2.5, z: 3.3},
    {x: 2.4, y:2.5, z: 2.4},
    {x: 3.3, y: 2.5, z: 0},
    {x: 2.4, y: 2.5, z: -2.4},
    {x: 0, y:2.5, z: -3.3},
    {x: -2.4, y: 2.5, z: -2.4},
    {x: -3.3, y: 2.5, z: 0},
    {x: -2.4, y: 2.5, z: 2.4},

    {x: 0, y: 3.3, z: 3},
    {x: 2.1, y:3.3, z: 2.1},
    {x: 3, y: 3.3, z: 0},
    {x: 2.1, y: 3.3, z: -2.1},
    {x: 0, y:3.3, z: -3},
    {x: -2.1, y:3.3, z: -2.1},
    {x: -3, y:3.3, z: 0},
    {x: -2.1, y:3.3, z: 2.1},

    {x: 0, y: 4.2, z: 2},
    {x: 1.4, y: 4.2, z: 1.4},
    {x: 2, y: 4.2, z: 0},
    {x: 1.4, y: 4.2, z: -1.4},
    {x: 0, y: 4.2, z: -2},
    {x: -1.4, y: 4.2, z: -1.4},
    {x: -2, y: 4.2, z: 0},
    {x: -1.4, y: 4.2, z: 1.4},

    {x: 0, y:4.8, z: 1},
    {x: 0.7, y:4.8, z: 0.7},
    {x: 1, y:4.8, z: 0},
    {x: 0.7, y:4.8, z: -0.7},
    {x: 0, y:4.8, z: -1},
    {x: -0.7, y:4.8, z: -0.7},
    {x: -1, y:4.8, z: 0},
    {x: -0.7, y:4.8, z: 0.7},
    {x: 0, y:5, z: 0},

  ],
  
  
  
  LINES:[
    [0, 1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
    [8, 1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],
    [1, 9],[2,10],[3,11],[4,12],[5,13],[6,14],[7,15],[8,16],
    [16, 9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],[15,16],
    [1, 9],[2,10],[3,11],[4,12],[5,13],[6,14],[7,15],[8,16],
    [16, 9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],[15,16],
    [9,17],[10,18],[11,19],[12,20],[13,21],[14,22],[15,23],[16,24],
    [24,17],[17,18],[18,19],[19,20],[20,21],[21,22],[22,23],[23,24],
    [17,25],[18,26],[19,27],[20,28],[21,29],[22,30],[23,31],[24,32],
    [32,25],[25,26],[26,27],[27,28],[28,29],[29,30],[30,31],[31,32],
    [25,33],[26,34],[27,35],[28,36],[29,37],[30,38],[31,39],[32,40],
    [40,33],[33,34],[34,35],[35,36],[36,37],[37,38],[38,39],[39,40],
    [33,41],[34,42],[35,43],[36,44],[37,45],[38,46],[39,47],[40,48],
    [48,41],[41,42],[42,43],[43,44],[44,45],[45,46],[46,47],[47,48],
    [41,49],[42,50],[43,51],[44,52],[45,53],[46,54],[47,55],[48,56],
    [56,49],[49,50],[50,51],[51,52],[52,53],[53,54],[54,55],[55,56],
    [49,57],[50,58],[51,59],[52,60],[53,61],[54,62],[55,63],[56,64],
    [64,57],[57,58],[58,59],[59,60],[60,61],[61,62],[62,63],[63,64],
    [65,57],[65,58],[65,59],[65,60],[65,61],[65,62],[65,63],[65,64],
  ],


  // FACES: [
  //   {F:[0,1,3,2],c:"#ff0000"},
  //   {F:[4,5,7,6],c:"#00ff00"},
  //   {F:[0,1,5,4],c:"#0000ff"},
  //   {F:[0,2,6,4],c:"#ffff00"},
  //   {F:[3,1,5,7],c:"#ff00ff"},
  //   {F:[3,2,6,7],c:"#00ffff"},
  // ]
  
  
  }





const toCanvas = ({x,y,z})=>{
  return {x: x+WIDTH/2,
  y: -y+HEIGHT/2,
  z: z}



}



let rq = 0;

const to2D = ({x,y,z})=>{
 
  if(z <= 0) z =0.0001;
  FOV = 90*Math.PI/180;


  a = WIDTH/HEIGHT;
  let f = Math.abs(1/Math.tan(FOV/2));

	

  return {x: f*RENDERFACTOR*x/z, y: f*RENDERFACTOR*y/z,z:1};
}


const drawPoint= ({x,y,z},c)=>{
  // console.log(x,y,z);
  context.beginPath();
  context.rect(x-POINTSIZE/2,y-POINTSIZE/2,POINTSIZE,POINTSIZE);
  context.fillStyle=c;
  context.fill();
  context.closePath();
}

const drawLINE= (v1,v2,c)=>{
  // console.log(v1,v2)
  context.beginPath();
  context.moveTo(v1.x,v1.y);
  context.lineTo(v2.x,v2.y);
  context.strokeStyle=c;
  context.stroke();
  context.closePath();
}

const drawFACE = (obj)=>{
  if(obj.FACES){
    obj.FACES.forEach((face)=>{
      context.beginPath();

      face.F.forEach((pointIndex,i)=>{
        const e = obj.POINTS[pointIndex];

        let x = SCALAR*(e.x+obj.PIVOT.x- PLAYERPOSITION.x); 
        let y = SCALAR*(e.y+obj.PIVOT.y- PLAYERPOSITION.y); 
        let z = e.z+obj.PIVOT.z- PLAYERPOSITION.z; 
        const aux = toCanvas(to2D({x,y,z}))
        if(i){
          context.lineTo(aux.x,aux.y);
        }else{
          context.moveTo(aux.x,aux.y);
        }
      });
      context.closePath();
      context.fillStyle = face.c;
      context.fill();
    });
  }

}



const moveObject = (obj, addVector)=>{
  obj.PIVOT.x += addVector.x,
  obj.PIVOT.y += addVector.y,
  obj.PIVOT.z += addVector.z
  
  return obj;

}


const scale = (obj, s)=>{
  obj.POINTS.forEach((e)=>{
    e.x *=s;
    e.y *=s;
    e.z *=s;
  });
  return obj;
}

const rotateVector = (v,instructions)=>{
  
  instructions.forEach(e=>{
    const s = Math.sin(e[1]*Math.PI/180);
    const c = Math.cos(e[1]*Math.PI/180);
    const x = v.x;
    const y = v.y;
    const z = v.z;
    
    switch(e[0]){
      case 'x':
        v.x =x;
        v.y = c*y-s*z;
        v.z = s*y+c*z;
        break;
      case 'y':
        v.x =c*x+s*z;
        v.y = y;
        v.z = -s*x+c*z;
        break;
      case 'z':
        v.x =c*x-s*y;
        v.y =s*x+c*y;
        v.z =z;
        break;
    }
  });
  return v;

}

const rotateObject = (obj, instructions)=>{
  // {x: e.x-obj.PIVOT.x, y: e.y-obj.PIVOT.y,z: e.z-obj.PIVOT.z}
  obj.POINTS.forEach((e,i)=>{
   

    obj.POINTS[i] = rotateVector(e, instructions);
  });
  
  return obj;

}


const rotatePivotByCamera = (pivot, instructions) => {
  let vector = {
    x: pivot.x - PLAYERPOSITION.x,
    y: pivot.y - PLAYERPOSITION.y,
    z: pivot.z - PLAYERPOSITION.z
  };

  let rotatedVector = rotateVector(vector, instructions);

  return {
    x: rotatedVector.x + PLAYERPOSITION.x,
    y: rotatedVector.y + PLAYERPOSITION.y,
    z: rotatedVector.z + PLAYERPOSITION.z
  };
}


drawPoint(toCanvas(to2D(ORIGIN)), '#ff0000')


function drawOBJECT(obj){
  const pivot = {
   x: obj.PIVOT.x - PLAYERPOSITION.x,
   y: obj.PIVOT.y - PLAYERPOSITION.y,
   z: obj.PIVOT.z - PLAYERPOSITION.z
    
  };
/*
  obj.POINTS.forEach(e => {

    if(e.z+pivot.z > 0){
      x = SCALAR*(e.x+pivot.x)
      y = SCALAR*(e.y+pivot.y)
      z = e.z+pivot.z
      drawPoint(toCanvas(to2D({x,y,z})), '#00ff00');
    }
  });*/

  obj.LINES.forEach(e => {
    
    let i = e[0];
    let j = e[1];
    let v = obj.POINTS[i];
    x1 = SCALAR*(v.x+pivot.x)
    y1 = SCALAR*(v.y+pivot.y)
    z1 = v.z+pivot.z
    
    v = obj.POINTS[j];
    
    x2 = SCALAR*(v.x+pivot.x)
    y2 = SCALAR*(v.y+pivot.y)
    z2 = v.z+pivot.z
    // if(z2 > 0){
      drawLINE(toCanvas(to2D({x: x1,y: y1,z: z1})),toCanvas(to2D({x:x2,y:y2,z:z2})),  '#00ff00');
    // }
  });

  // drawFACE(obj);

}


const KEYS = {
  'w': false,
  's': false,
  'd': false,
  'a': false
}

const PLAYERPOSITION = {x:  0, y: 0,z: 0, vx:0,vy:0, vz:0};

function physics(){

  PLAYERPOSITION.vx = (KEYS['a'])?-0.1:KEYS['d']?0.1:0;
  PLAYERPOSITION.vz = (KEYS['w'])?0.1:KEYS['s']?-0.1:0;


  // cube.PIVOT.x += PLAYERPOSITION.vx;
  // cube.PIVOT.z += PLAYERPOSITION.vz;


  PLAYERPOSITION.x += PLAYERPOSITION.vx;
  PLAYERPOSITION.y += PLAYERPOSITION.vy;
  PLAYERPOSITION.z += PLAYERPOSITION.vz;


//   OBJECTS.forEach(obj=>{
//   const addVector = {x: PLAYERPOSITION.vx,y:PLAYERPOSITION.vy, z: PLAYERPOSITION.vz};
//   moveObject(rotateObject(obj, [['x',0]]),addVector  )
// })


}


let t = 0;
let vel = 1;

const OBJECTS = [scene, sphere, cube, pyramide, teceract];
setInterval(() => {


  // return
  physics();
  context.clearRect(0,0,WIDTH,HEIGHT);
  
  rq++;
  rq = rq%180; 

  // const OBJECTS = [scene];

  t += vel*5;
  if(t> 200 || t < -200) vel*=-1;


  rotateObject(cube, [['y',1]])
  rotateObject(teceract, [['y',1]])

  OBJECTS.forEach((obj, i)=>{

    // if(i)rotateObject(obj, [['z',1]]);
    // const aux =  moveObject(rotateObject(obj, [['x',0]]),addVector  );
    drawOBJECT(obj);
    // obj.PIVOT = piv;
  })
}, 1000/60);


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
    OBJECTS.forEach(obj=>{
      obj.PIVOT = rotatePivotByCamera(obj.PIVOT, [['y',-e.movementX/5]]);

      rotateObject(obj, [['y',-e.movementX/5]] )
      


      // a = rotatePivotByCamera(obj.PIVOT, [['y',e.movementX/5]])
      // console.log(a)
    })
  }


});


window.addEventListener('keydown', (e)=>{
  KEYS[e.key.toLocaleLowerCase()] = true;
})
window.addEventListener('keyup', (e)=>{
  KEYS[e.key.toLocaleLowerCase()] = false;
})


// drawOBJECT(cube);