import * as yup from "yup";
import _ from "lodash";

const isObject = (obj) => obj !== null && typeof obj === 'object'

const isInteger = (obj) => String(Math.floor(Number(obj))) === obj;

const getIn = (obj, key, def, p = 0) => {
  const path = _.toPath(key);
  while (obj && p < path.length) {
    obj = obj[path[p++]];
  }
  return obj === undefined ? def : obj;
}

const setIn = (obj, path, value) => {
  let res = _.clone(obj); // this keeps inheritance when obj is a class
  let resVal = res;
  let i = 0;
  let pathArray = _.toPath(path);

  for (; i < pathArray.length - 1; i++) {
    const currentPath = pathArray[i];
    let currentObj = getIn(obj, pathArray.slice(0, i + 1));

    if (currentObj && (isObject(currentObj) || Array.isArray(currentObj))) {
      resVal = resVal[currentPath] = _.clone(currentObj);
    } else {
      const nextPath = pathArray[i + 1];
      resVal = resVal[currentPath] = isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {};
    }
  }
  // Return original object if new value is the same as current
  if ((i === 0 ? obj : resVal)[pathArray[i]] === value) {
    return obj;
  }

  if (value === undefined) {
    delete resVal[pathArray[i]];
  } else {
    resVal[pathArray[i]] = value;
  }

  // If the path array has a single element, the loop did not run.
  // Deleting on `resVal` had no effect in this scenario, so we delete on the result instead.
  if (i === 0 && value === undefined) {
    delete res[pathArray[i]];
  }

  return res;
}

const handleValidate = (formData) => {
  const formSchema = {}
  const validateData = {}

  for (let i = 0; i < formData.length; i++) {
    const element = formData[i];
    if(element.rules) {
      formSchema[element.name] = element.rules
      validateData[element.name] = element.value
    }
  }
  
  let schema = yup.object().shape(formSchema);
  return schema.validate(validateData, {abortEarly: false})
  .then(result => {
    return {
      status: 200,
      data: result
    }
  })
  .catch(yupError => {
    let errors = {};
    if (yupError.inner) {
      if (yupError.inner.length === 0) {
        return setIn(errors, yupError.path, yupError.message);
      }
      for (let err of yupError.inner) {
        if (!getIn(errors, err.path)) {
          errors = setIn(errors, err.path, err.message);
        }
      }
    }

    return {
      status: 400,
      data: errors
    }
  });
}

export default handleValidate;