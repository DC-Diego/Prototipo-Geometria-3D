export class Object3D{

  #name;

  #POSITION = [0,0,0];
  #ROTATE = [0,0,0];
  #POINTS = [];
  #FACES = [];
  #SCALE = [1,1,1];
  constructor(name){
    this.#name = name;

  }

  createPoint([x,y,z]){
    this.#POINTS.push([x,y,z]);

  }

  getPoint(i){
    return this.#POINTS[i];
  }

  getFace(i){
    return  this.#FACES[i];
  }
  getScale(){
    return this.#SCALE;
  }
  setScale(S){
    this.#SCALE = S;
  }

  createFace(points){
    this.#FACES.push(points);
  }
  getAllFaces(){
    return this.#FACES;
  }

  setPosition(t){
    this.#POSITION = t;
  }

  setRotation(r){
    this.#ROTATE = r;
  }

  translate(T){
    this.#POSITION[0] = this.#POSITION[0] + T[0];
    this.#POSITION[1] = this.#POSITION[1] + T[1];
    this.#POSITION[2] = this.#POSITION[2] + T[2];
  }

  rotate(R){
    this.#ROTATE[0] = this.#ROTATE[0]+ R[0];
    this.#ROTATE[1] = this.#ROTATE[1]+ R[1];
    this.#ROTATE[2] = this.#ROTATE[2]+ R[2];
  }

  getPosition(){
    return this.#POSITION;
  }
  getRotation(){
    return this.#ROTATE;
  }

  getAllPoints(){
    return this.#POINTS;
  }






}