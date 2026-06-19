import { Object3D } from "./Object.js";

export class Grid3D extends Object3D{

  constructor(name, qtdX, qtdY, spaceX,spaceY ){
    super(name);
    this.init(qtdX, qtdY, spaceX, spaceY);
  }

  init(x,y,sx, sy){
    const blackHole = (x,y,dx,dy)=>{
      const r= Math.sqrt( (x-dx)*(x-dx) + (y-dy)*(y-dy)   )
      // return 1*(Math.random()-0.5)
      // return y*y/50-x*x/50;
      return -150/(r +0.000001) + Math.sin(r/1)*10*0;
    }


    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        const ux = (x/2-i)*sx;
        const uy = (y/2-j)*sy;


        // console.log(blackHole(sx*i, sy*j, x/2,y/2))
        // this.createPoint([sx*i, blackHole(sx*i, sy*j, sx*x/2,sy*y/2), sy*j]);
        this.createPoint([ux, 1, uy]);
      }
    }
    for (let i = 0; i < x-1; i++) {
      for (let j = 0; j < y-1; j++) {
        this.createFace([i+j*y, i+1+j*y, i+1+(j+1)*y, i+(j+1)*y]);
      }
    }
  }



}