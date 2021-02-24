import GLObject from '../classes/GLObject';
import GLObjectInput from './GLObjectInput';

export const drawTriangle = (
  config: GLObjectInput,
  program: WebGLProgram,
  gl: WebGL2RenderingContext
) => {
  const object = new GLObject(config.id, program, gl);
  object.setVertexArray(config.vertexArr);
  object.setPosition(config.position[0], config.position[1]);
  object.setRotation(config.rotation);
  object.setScale(config.scale[0], config.scale[1]);
  object.bind();

  return object;
};
