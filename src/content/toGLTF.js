import fs from 'fs';
import toJSON from './toJSON';

// check whether input data is in JSON format in 'toJSON.js'
function toGLTF(data) {

  // checking if data is in JSON format compatible with DevTools
  const isDevtoolsSerialization = meta => !!(meta && meta.devtoolsConfig);
  if (isDevtoolsSerialization(data)) data = toJSON.apply(this, arguments)

  const toGLTF = this.constructor &&
  this.constructor.prototype &&
  this.constructor.prototype.toGLTF;
  
  fs.writeFile('download.gltf', data, { flag: "a" }, (err) => {
    if (err) console.error(err.message)
    else {
      console.log('Successfully exported to gltf with the following content:\n')
      console.log(fs.readFileSync('download.gltf', 'utf8'))
    }
  })
}

export default toGLTF