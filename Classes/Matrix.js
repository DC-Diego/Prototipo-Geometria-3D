export class Matrix{
  
 
  // A.length = ROWS
  // A[0].length = COLUMNS


  static toRadians(o){
    return o*Math.PI/180;
  }


  static toVectorObject(v){
    if(v.length == 4) return {x: v[0][0], y: v[1][0], z: v[2][0], w: v[3][0]};
    if(v.length == 3) return {x: v[0][0], y: v[1][0], z: v[2][0]};
    if(v.length == 2) return {x: v[0][0], y: v[1][0]};

  }

  static toVectorArray(v){
    return [[v.x], [v.y], [v.z], [v.w]];
  }


  static getProjectionMatrix(w,h,f){
    const M =this.createMatrix(4,4);
    const aspect = w/h;
    // const aspect = 1;
    f = this.toRadians(f);
    const FOV = Math.abs(1/Math.tan(f/2));
    const far = 10;
    const near = 0.5;
    const SCALE = 50;

    M[0][0] = SCALE*1*(aspect*FOV);
    M[1][1] = SCALE*1*FOV;
    M[2][2] = (far+near)/(near-far);
    M[2][3] = 2*far*near/(near-far);
    // M[2][2] = 1;
    M[3][2] = -1;
    return M;
  }




  static matrixRotateX(o){
    o = this.toRadians(o);
    const res = this.createMatrix(4,4);
    const s = Math.sin(o);
    const c = Math.sqrt(1-s*s);
    res[0][0] = 1;
    res[3][3] = 1;
    res[1][1] = c;
    res[1][2] = -s;
    res[2][1] = s;
    res[2][2] = c;
    return res;
    
  }
  
  
  static matrixRotateY(o){
    o = this.toRadians(o);
    const res = this.createMatrix(4,4);
    const s = Math.sin(o); 
    const c = Math.sqrt(1-s*s);
    res[0][0] = c;
    res[0][2] = s;
    res[2][0] = -s;
    res[2][2] = c;
    res[1][1] = 1;
    res[3][3] = 1;
    return res;
  }
  
  
  static matrixRotateZ(o){
    o = this.toRadians(o);
    const res = this.createMatrix(4,4);
    const s = Math.sin(o);
    const c = Math.sqrt(1-s*s);
    res[0][0] = c;
    res[0][1] = -s;
    res[1][0] = s;
    res[1][1] = c;
    res[2][2] = 1;
    res[3][3] = 1;
    return res;
  }


  static matrixTranslate(tx, ty, tz){
    const res = this.createMatrix(4,4);
    res[0][0] = 1;
    res[1][1] = 1;
    res[2][2] = 1;
    res[3][3] = 1;
    res[0][3] = tx;
    res[1][3] = ty;
    res[2][3] = tz;
    return res;
  }


  static createMatrix(m,n){
    const res = new Array(m);
    for (let i = 0; i < m; i++) {
      res[i] = new Array(n).fill(0);
    }
    return res;
  }


  static sumMatrix(A, B){
    if(A.length == B.length && A[0].length == B[0].length){
      const colA = A[0].length;
      const rowA = A.length;
      const res =  this.createMatrix(rowA,colA);
      for (let i = 0; i < rowA; i++) {
        for (let j = 0; j < colA; j++) {
          res[i][j] = A[i][j]+B[i][j];
        }
      }
      return res;      
    }
    return null;
  }

  static scalarMatriz(A, scalar){
    const rowA = A.length;
    const colA = A[0].length;
    const res = this.createMatrix(rowA,colA);
    for (let i = 0; i < rowA; i++) {
      for (let j = 0; j < colA; j++) {
        res[i][j] = A[i][j]*scalar;
      }
    }
    return res;
  }

  static multiplyMatrix(A, B){
    const colA = A[0].length;  
    const rowB = B.length;
    if(colA == rowB){
      const rowA = A.length;  
      const colB = B[0].length;  
      const res = this.createMatrix(rowA,colB);
      for (let i = 0; i < rowA; i++) {
        for (let j = 0; j < colB; j++) {
          for (let k = 0; k < colA; k++) {
            res[i][j] = res[i][j] + A[i][k]*B[k][j]; 
          }
        }
      }
      return res;
    }
    return null;


  }





}