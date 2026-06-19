import { Object3D } from "./Object.js";

export class UV_Sphere3D extends Object3D{
  constructor(name, radius, rings, details){
    super(name);

    this.init(radius, rings, details);
  }

  init(r, rings, details){
      //points
    const angle = Math.PI*2/details;
    const dy = Math.PI/(rings+1);
    this.createPoint([0,-r,0]);
    
    for(let j = 1; j <= rings; j++){
      const cosY = Math.cos(dy*(j)-Math.PI/2);
      const sinY = Math.sin(dy*(j)-Math.PI/2);
      const y = sinY*r;
      for(let i = 0; i< details;i++){
        const c =Math.cos(angle*i); 
        const s =Math.sin(angle*i); 
        const x = c*cosY*r;
        const z = s*cosY*r;
        this.createPoint([x,y,z]);
      } 
    }
    this.createPoint([0,r,0]);
         

    // Poles:
    for(let i = 0; i < details;i++){
      const last = (rings-1)*details
      this.createFace([0,i+1, (i+1)%details+1]);
      this.createFace([rings*details+1,last+i+1,last+ (i+1)%details+1]);
    }

    for(let j = 0; j < rings-1; j++){
      for (let i = 1; i <= details;i++) {
        const modDetail = (i)%details;
        const height = j*rings;
        this.createFace([i+height, modDetail+1+height, modDetail+1+rings+height,i+rings+height]);
        
        
        
      }
    }
      




  }




}