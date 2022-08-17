const uuidRegex = /^([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}){1}$/
export const isUUID = (str: string) => {
  return typeof str === 'string' && uuidRegex.test(str);
};

export const getEntityName = (entity: {[key: string]:string}) => {
  return entity.name || entity.baseType;
};

/**
 * Operates on a serialized THREE object,
 * recursively searching through the objects for a
 * matching UUID.
 */
// currently returns type any because it will be an object - not a strict type
 export const getObjectByUUID: any = (obj: {[key: string]:string}, uuid: string) => {
  if (obj.uuid === uuid) {
    return obj;
  } else if (obj.children && obj.children.length) {
    for (let child of obj.children) {
      let result = getObjectByUUID(child, uuid);
      if (result) {
        return result;
      }
    }
  } else {
    return null;
  }
};