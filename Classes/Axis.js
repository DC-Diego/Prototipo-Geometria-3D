import { Object3D } from "./Object.js";

export class Axis extends Object3D{
  constructor(name){
    super(name);
    this.#init();

  }

  #init(){
    this.createPoint([0,0,0]);
    this.createPoint([2,0,0]);
    this.createPoint([0,2,0]);
    this.createPoint([0,0,2]);

    this.createPoint([1,-1,2]);
    this.createPoint([-1,-1,2]);
    this.createPoint([1,1,2]);
    this.createPoint([-1,1,2]);

    this.createFace([4,5,6,7,6,5,4]);

    this.createPoint([2,1,1]);
    this.createPoint([2,-1,-1]);
    this.createPoint([2,1,-1]);
    this.createPoint([2,-1,1]);

    this.createFace([8,9]);
    this.createFace([10,11]);

    this.createPoint([0,2,0]);
    this.createPoint([0,3,0]);
    this.createPoint([0.25,4,0.25]);
    this.createPoint([-0.25,4,-0.25]);

    this.createFace([12,13,14,13,15,13]);

    this.createFace([0,1]);
    this.createFace([0,2]);
    this.createFace([0,3]);

  }

}