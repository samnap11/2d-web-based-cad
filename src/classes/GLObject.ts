import { multiplyMatrix } from '../utils/matrix';

class GLObject {
  public id: number;
  public vertexArr: number[];
  public shader: WebGLProgram;
  public position: [number, number];
  public rotation: number;
  public scale: [number, number];
  public gl: WebGL2RenderingContext;

  public projectionMatrix: number[];

  constructor(id: number, shader: WebGLProgram, gl: WebGL2RenderingContext) {
    this.id = id;
    this.gl = gl;
    this.shader = shader;
  }

  setVertexArray(vertexArr: number[]) {
    this.vertexArr = [...vertexArr];
  }

  setPosition(x: number, y: number) {
    this.position = [x, y];
    this.projectionMatrix = this.calculateProjectionMatrix();
  }

  setRotation(deg: number) {
    this.rotation = deg;
    this.projectionMatrix = this.calculateProjectionMatrix();
  }

  setScale(x: number, y: number) {
    this.scale = [x, y];
    this.projectionMatrix = this.calculateProjectionMatrix();
  }

  calculateProjectionMatrix() {
    if (
      this.position === undefined ||
      this.rotation === undefined ||
      this.scale === undefined
    )
      return null;

    const [x, y] = this.position;

    const translationMatrix = [1, 0, 0, 0, 1, 0, x, y, 1];

    const degreeOfRotation = this.rotation;

    const radianOfRotation = (degreeOfRotation * Math.PI) / 180;

    const sinusOfRotation = Math.sin(radianOfRotation);

    const cosinusOfRotation = Math.cos(radianOfRotation);

    const rotationMatrix = [
      cosinusOfRotation,
      -sinusOfRotation,
      0,
      sinusOfRotation,
      cosinusOfRotation,
      0,
      0,
      0,
      1,
    ];

    const [k1, k2] = this.scale;

    const scaleMatrix = [k1, 0, 0, 0, k2, 0, 0, 0, 1];

    const projectionMatrix = multiplyMatrix(
      multiplyMatrix(rotationMatrix, scaleMatrix),
      translationMatrix
    );

    return projectionMatrix;
  }

  bind() {
    const gl = this.gl;
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(this.vertexArr),
      gl.STATIC_DRAW
    );
  }

  draw() {
    const gl = this.gl;

    gl.useProgram(this.shader);
    const vertexPosition = gl.getAttribLocation(this.shader, 'a_pos');
    const uniformColor = gl.getUniformLocation(this.shader, 'u_fragColor');
    const uniformPosition = gl.getUniformLocation(this.shader, 'u_proj_mat');
    const uniformResolution = gl.getUniformLocation(
      this.shader,
      'u_resolution'
    );

    gl.enableVertexAttribArray(vertexPosition);
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.uniformMatrix3fv(uniformPosition, false, this.projectionMatrix);
    gl.uniform4fv(uniformColor, [1.0, 0.0, 0.0, 1.0]);
    gl.uniform2f(uniformResolution, gl.canvas.width, gl.canvas.height);
    if (this.vertexArr.length <= 4) {
      gl.drawArrays(gl.LINES, 0, this.vertexArr.length / 2);
    } else {
      gl.drawArrays(gl.TRIANGLE_FAN, 0, this.vertexArr.length / 2);
    }
  }

  drawSelect(selectProgram: WebGLProgram) {
    const gl = this.gl;
    const id = this.id;

    gl.useProgram(selectProgram);
    const vertexPosition = gl.getAttribLocation(this.shader, 'a_pos');
    const uniformColor = gl.getUniformLocation(this.shader, 'u_fragColor');
    const uniformPosition = gl.getUniformLocation(this.shader, 'u_proj_mat');

    gl.enableVertexAttribArray(vertexPosition);
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.uniformMatrix3fv(uniformPosition, false, this.projectionMatrix);

    const uniformId = [
      ((id >> 0) & 0xff) / 0xff,
      ((id >> 8) & 0xff) / 0xff,
      ((id >> 16) & 0xff) / 0xff,
      ((id >> 24) & 0xff) / 0xff,
    ];

    gl.uniform4fv(uniformColor, uniformId);
    gl.drawArrays(gl.TRIANGLES, 0, this.vertexArr.length);
  }
}

export default GLObject;
