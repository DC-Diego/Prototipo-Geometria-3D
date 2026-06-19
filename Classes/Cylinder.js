import { Object3D } from "./Object.js";

export class Cylinder3D extends Object3D{
  constructor(name, radius, detail, height){
    super(name);

    this.init(radius, detail, height);
  }

  init(radius, detail, height){
    const angle = Math.PI*2/detail;
    // points
    for(let i = 0; i < detail; i++){
      const c = Math.cos(angle*i);
      const s = Math.sin(angle*i);
      this.createPoint([c*radius, -height/2,s*radius])
      this.createPoint([c*radius, height/2,s*radius])

    }

    // lateral:
    for(let i = 0, j =0; i < detail;i++){
      this.createFace([j,j+1,(j+3)%(2*detail), (j+2)%(2*detail)]);
      j = j+2;


    }
    //top:
    const top = [];
    const bottom = [];
    for(let i = 0, j =0; i < detail;i++){
      top.push(j);
      bottom.push(j+1);
      j = j+2;
    }
    this.createFace(top);
    this.createFace(bottom);
      

  }

}