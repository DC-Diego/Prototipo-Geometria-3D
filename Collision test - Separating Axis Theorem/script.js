const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const WIDTH = document.body.clientWidth; 
const HEIGHT = document.body.clientHeight; 

canvas.width = WIDTH;
canvas.height = HEIGHT;

const toCanvas = ([x,y])=>{
  return [(WIDTH+x)/2, (HEIGHT-y)/2];


}


const drawPoint = ([x,y], c="#000000")=>{

  context.beginPath();
  context.arc(x,y,5,0,Math.PI*2);
  context.fillStyle = c;
  context.fill();
  context.closePath();

}


const drawLine = (p1, p2, c = "#000000")=>{

  context.beginPath();
  context.moveTo(p1[0], p1[1]);
  context.lineTo(p2[0], p2[1]);
  context.strokeStyle = c;
  context.stroke();
  context.closePath();

}


const sumVectors = (u,v)=>{
  return [
    u[0]+v[0],
    u[1]+v[1]
  ];

}

const rotate = (v, o)=>{
    const c = Math.cos(Math.PI*o/180);
    const s = Math.sin(Math.PI*o/180);
    
    return [
      v[0]*c-v[1]*s,
      v[0]*s+v[1]*c
    ]



}

const toWorld = (obj, p)=>{
  let res = rotate(p, obj.ROTATE);
  return sumVectors( res   ,obj.POSITION)



}


const render = ()=>{
  OBJS.forEach(obj=>{
    const n = obj.POLY.length;
    for(let i = 0; i < n; i++){
      const p1 = toWorld(obj, obj.POINTS[obj.POLY[i%n]]);
      const p2 = toWorld(obj,obj.POINTS[obj.POLY[(i+1)%n]]);
      // const p1 = sumVectors(  obj.POINTS[obj.POLY[i%n]]   ,obj.POSITION);  
      // const p2 = sumVectors(obj.POINTS[obj.POLY[(i+1)%n]]   ,obj.POSITION);  
      drawPoint(toCanvas(p1));
      drawLine(toCanvas(p1),toCanvas(p2));
    }




  });

}

const multiplyScalar = (v, s)=>{
  return [
    v[0]*s,
    v[1]*s
  ];

}


const getNormal =(p1, p2)=>{
  return [ (p2[1]-p1[1]),
    -(p2[0]-p1[0])
  ];

}

const normalsDraw = (obj1, obj2)=>{
  const obj1_normals = [];
  const obj2_normals = [];

  let n = obj1.POLY.length;
  for(let i = 0; i < n; i++){
    const p1 = toWorld(obj1, obj1.POINTS[obj1.POLY[i%n]]);
    const p2 = toWorld(obj1,obj1.POINTS[obj1.POLY[(i+1)%n]]);
    obj1_normals.push(getNormal(p1, p2));
  }
  n = obj2.POLY.length;
  for(let i = 0; i < n; i++){
    const p1 = toWorld(obj2, obj2.POINTS[obj2.POLY[i%n]]);
    const p2 = toWorld(obj2,obj2.POINTS[obj2.POLY[(i+1)%n]]);
    obj2_normals.push(getNormal(p1, p2));
  }
  drawNormal(obj1, obj1_normals);
  drawNormal(obj2, obj2_normals);

  // PROJECT TO LADO E CALCULAR SOMBRA

}

const drawNormal = (obj, Normals)=>{
  let n = obj.POLY.length;
  for(let i = 0; i < n; i++){
    const p1 = toWorld(obj, obj.POINTS[obj.POLY[i%n]]);
    const p2 = toWorld(obj,obj.POINTS[obj.POLY[(i+1)%n]]);
    drawLine( toCanvas(multiplyScalar(sumVectors(p1,p2), 1/2)), toCanvas(sumVectors(Normals[i], obj.POSITION)), "#ff0000");


  }

}

const dotProduct = (u,v)=>{
  return u[0]*v[0]+u[1]*v[1];

}

const getModule = (v)=>{
  return Math.sqrt( dotProduct(v,v) );

}

const getVersor = (v)=>{
  return multiplyScalar(v,1/getModule(v));


}

const projectedPoint = (u, v)=>{
  const v_module = getModule(v);
  const u_v_dotProduct = dotProduct(u,v);
  return multiplyScalar( v,u_v_dotProduct/v_module);



}

const sombraPoint = (sombra, p1, base)=>{
  p1 = dotProduct(p1, base);
  if(sombra.max == null){
    sombra.max = p1;
    sombra.min = p1;
  }else if(p1 > sombra.max){
    sombra.max = p1;
  } else if(p1 < sombra.min){
    sombra.min = p1;
  }
}



const collision = (obj1, obj2)=>{
  const n = obj1.POLY.length;
  for(let i = 0; i < n; i++){
    const p1 = toWorld(obj1, obj1.POINTS[obj1.POLY[i%n]]);
    const p2 = toWorld(obj1,obj1.POINTS[obj1.POLY[(i+1)%n]]);
      
    const sombra1 = {
      min: null,
      max: null
    }
    const sombra2 = {
      min: null,
      max: null
    }
    
    const p1_neg = multiplyScalar(p1, -1);
    const base_vect = getVersor(sumVectors(p2, p1_neg));
    obj1.POINTS.forEach(e=>{
      
      e = toWorld(obj1, e);
      const u_vect = sumVectors(e, p1_neg);
      const new_p = projectedPoint(u_vect, base_vect);
      sombraPoint(sombra1, new_p, base_vect);
      // drawPoint(toCanvas(new_p), "#00ff00");
    });
    obj2.POINTS.forEach(e=>{
      e = toWorld(obj2, e);
      const u_vect = sumVectors(e, p1_neg);
      const new_p = projectedPoint(u_vect, base_vect);
      sombraPoint(sombra2, new_p, base_vect);
      // drawPoint(toCanvas(new_p), "#ff0000");
    });


    if( sombra1.max < sombra2.min || sombra2.max < sombra1.min){
      return false;
    }

    
  }
  return true;

}

const collisionSAT = (obj1, obj2)=>{
  // Para cada lado L:
  // Projetar todos os pontos de ambos os objetos em uma reta paralela à L:
  // os pontos do obj1 formam a sombra 1: com extremidades minimas e máximas (lado esquerdo e direito), e obj2 também.
  // se as sombras não se "colidirem/overlaparem", retornar false (pois não há colisão).
  // se para todos os lados houver colisão, significa que os objetos estão colidindo...

  // lados de obj1:
  // if(collision(obj1, obj2) && collision(obj2, obj1)){
  //   console.log("COLLISION!");
  // }else{
  //   console.log("NO COLLISION!");

  // }
  return collision(obj1, obj2) && collision(obj2, obj1);



}





const clearCanvas = ()=>{
  context.clearRect(0,0,WIDTH, HEIGHT);
}

const displayGrid = ()=>{
 
  context.beginPath();
  context.moveTo(WIDTH/2, 0);
  context.lineTo(WIDTH/2, HEIGHT);
  context.moveTo(0, HEIGHT/2);
  context.lineTo(WIDTH, HEIGHT/2);
  context.strokeStyle = "#00ff00";
  context.stroke();
  context.closePath();
}
let t =0;
velRotate = 1;
velX = 1;
const time = ()=>{
  t++;
  clearCanvas();
  displayGrid();
  if(collisionSAT(obj1, obj2)){velRotate *=-1; velX *=-1;}
  
  if(obj1.POSITION[0] < -WIDTH ||obj1.POSITION[0] > WIDTH ) velX *=-1;

  obj2.ROTATE += 1*velRotate;
  obj1.POSITION[0] += 10*velX;

  render();
  normalsDraw(obj1, obj2);
  requestAnimationFrame(time);
}


const obj1 = {
  POSITION: [50, 50],
  POINTS: [
    [-50, 50],
    [-50, -50],
    [50, -50],
    [50, 50],
  ],
  POLY: [0,1,2,3],
  ROTATE: 0,
  COLOR: "#ff0000" 
}

const obj2 = {
  POSITION: [200, 100],
  POINTS: [
    [-80, 80],
    [-80, -80],
    [80, -80],
    [80, 80],
  ],
  POLY: [0,1,2,3],
  ROTATE: 0,
  COLOR: "#00ff00" 
}

const OBJS = [obj1, obj2];

time();


const p1 = [50, 50];
const p2 = [200, 100];

/*
drawPoint(p1);
drawPoint(p2);
drawLine(p1, p2);
*/