export type Matrix = number[][];

export type Vector2 = {
  x: number;
  y: number;
};

export const vector2ToMatrix = (v: Vector2): Matrix => {
  return [[v.x], [v.y]];
};

export const multiply = (m1: Matrix, m2: Matrix): Matrix => {
  const m1NumRows = m1.length;
  const m2NumRows = m2.length;
  const m2NumCols = m2[0].length;

  const result = new Array(m1NumRows);
  for (let i = 0; i < m1NumRows; i ++) {
    result[i] = new Array(m2NumCols);
  }

  for (let i = 0; i < m1NumRows; i++) {
    for (let j = 0; j < m2NumCols; j++) {
      let tot = 0;
      for (let k = 0; k < m2NumRows; k++) {
        tot += m1[i][k] * m2[k][j];
      }
      result[i][j] = tot;
    }
  }

  return result;
};

export const matrixToVector2 = (m: Matrix): Vector2 => {
  return { x: m[0][0], y: m[1][0] };
}
