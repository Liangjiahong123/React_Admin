function validHelper(value, type) {
  return Object.prototype.toString.call(value) === `[object ${type}]`;
}

export function objIsEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let i = 0; i < keys1.length; i++) {
    const prop = keys1[i];
    if (obj1[prop] !== obj2[prop]) return false;
  }

  return true;
}

function isNull(value) {
  return validHelper(value, "Null");
}

export function isObject(value) {
  return !isNull(value) && validHelper(value, "Object");
}
