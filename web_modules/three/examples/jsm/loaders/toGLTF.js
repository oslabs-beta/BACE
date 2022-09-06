import { GLTFLoader } from './GLTFLoader'
import toJSON from '../../../../../src/content/toJSON.js'

export default (() => {

  return function toGLTF(meta) {
    const converter = new GLTFLoader();
    const toGLTF = this.constructor &&
    this.constructor.prototype &&
    this.constructor.prototype.toGLTF;

    if (toGLTF && !converter.isDevtoolsSerialization(meta)) {
      
    }
  }
})