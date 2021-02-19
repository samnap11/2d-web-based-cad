export const fetchShader = async (source: string) => {
  const shader = await fetch('/shaders/' + source).then((res) => res.text());
  console.log('/shaders/' + source);
  console.log(shader);
  return shader;
};

export const createShader = async (
  gl: WebGL2RenderingContext,
  type: number,
  source: string
) => {
  const rawShader = await fetchShader(source);
  const shader = gl.createShader(type);

  gl.shaderSource(shader, rawShader);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (success) return shader;

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
};

export const initShaderFiles = async (
  gl: WebGL2RenderingContext,
  vertexShaderSource: string,
  fragmentShaderSource: string
) => {
  const vertexShader = await createShader(
    gl,
    gl.VERTEX_SHADER,
    vertexShaderSource
  );
  const fragmentShader = await createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );

  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (success) return program;

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return null;
};
