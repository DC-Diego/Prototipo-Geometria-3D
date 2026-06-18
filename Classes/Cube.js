import { Object3D } from "./Object.js";

export class Cube extends Object3D{

  constructor(name){
    super(name);
    this.init();
  }

  init(){
    const points = [
      [1,1,-1],
      [1,-1, -1],
      [-1,1, -1],
      [-1,-1, -1],
      [1,1, 1],
      [1,-1, 1],
      [-1,1, 1],
      [-1,-1, 1],
    ];
    points.forEach(e=>{
      this.createPoint(e);
    });
    [
      [0,1,3,2],
      [0,1,2],
      [4,5,7,6],
      [0,1,5,4],
      [0,2,6,4],
      [3,1,5,7],
      [3,2,6,7],
    ].forEach(e=>{
      this.createFace(e);
    })



  }


}