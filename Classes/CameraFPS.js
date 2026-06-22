export class Camera{
  #translate = [0,0,0];
  #rotate = [0,0,0];

  #localAxis = [
    [1,0,0],
    [0,1,0],
    [0,0,1]
  ];


  setRotation(rotation){
    this.#rotate = rotation;
  }
  getRotation(){ return this.#rotate}


  getLocalAxis(){
    return [
      this.#localAxis[0],
      this.#localAxis[1],
      this.#localAxis[2],
    ];

  }
  setLocalAxis(x,y,z){
    this.#localAxis = [ x, y, z ];

  }

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
