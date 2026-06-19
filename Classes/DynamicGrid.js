import { Object3D } from "./Object.js";

export class DynamicGrid extends Object3D{

  
  #fx = ()=>{}
  #fy = ()=>{}
  #fz = ()=>{}
  constructor(name, qtd, spaceX, spaceZ, fx, fy, fz){
    super(name);
    this.init(qtd, spaceX, spaceZ, fx, fy, fz);
    this.#fx = fx;  
    this.#fy = fy;  
    this.#fz = fz;  
  }




  init(qtd, sx, sz,fx, fy, fz){
   


    for (let i = 0; i < qtd; i++) {
      for (let j = 0; j < qtd; j++) {
        const ux = (i-(qtd-1)/2)*sx;
        const uz = (j-(qtd-1)/2)*sz;
        // const y = fy(ux, 1, uz, 0);
        const y = 1;

        // console.log(blackHole(sx*i, sy*j, x/2,y/2))
        // this.createPoint([sx*i, blackHole(sx*i, sy*j, sx*x/2,sy*y/2), sy*j]);
        // this.createPoint([fx(ux,y,uz, 0), y, fz(ux,y,uz, 0)]);
        this.createPoint([ux, y, uz]);
      }
    }



    for (let i = 0; i < qtd-1; i++) {
      for (let j = 0; j < qtd-1; j++) {
        this.createFace([i+j*qtd, i+1+j*qtd, i+1+(j+1)*qtd, i+(j+1)*qtd]);
      }
    }
    




  }


  getAllPoints(time){
    const returnedPoints = [];
    super.getAllPoints().forEach(e=>{
      const x = e[0];
      const z = e[2];
      // const y = e[1];
      const y = this.#fy(x, e[1], z, time);

      // console.log(blackHole(sx*i, sy*j, x/2,y/2))
      // this.createPoint([sx*i, blackHole(sx*i, sy*j, sx*x/2,sy*y/2), sy*j]);
      returnedPoints.push([this.#fx(x,y,z, time), y, this.#fz(x,y,z, time)]);

    });
    return returnedPoints

  }



}