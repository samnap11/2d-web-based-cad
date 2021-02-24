import GLObject from './GLObject';

class Renderer {
  public objectList: Array<GLObject>;
  public count: number;

  constructor() {
    this.objectList = new Array<GLObject>();
    this.count = 0;
  }

  addObject(object: GLObject) {
    this.objectList.push(object);
    this.count++;
  }

  removeObject(id: number) {
    const idx = this.objectList.findIndex((obj) => obj.id === id);
    this.objectList.splice(idx, 1);
    this.count--;
  }

  renderAll() {
    for (const obj of this.objectList) {
      obj.draw();
    }
  }

  render(id: number) {
    for (let i = 0; i < this.objectList.length; i++) {
      if (this.objectList[i].id === id) {
        this.objectList[i].draw();
        break;
      }
    }
  }

  renderTex(selectProgram: WebGLProgram) {
    for (const obj of this.objectList) {
      obj.drawSelect(selectProgram);
    }
  }
}

export default Renderer;
