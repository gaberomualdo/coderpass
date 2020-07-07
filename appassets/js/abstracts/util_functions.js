// function to generate random ID --> currently acts as a referral to the uuidv4 function
const generateRandomID = uuid.v4;

// function to check for valid JSON
// some code taken from user Gumbo on https://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try/3710226
const isValidJSONString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

/*
function to get a list of all object keys and vals (recursively); for example:

given the object: { "prop1": "val1", "prop2": {"test": "test_val"} }
the func would yield: [{key: "prop1", val: "val1"}, {key: "prop2"}, {key: "test", val: "test_val"}]
*/
const getListOfObjValsRecursively = (obj) => {
  let listOfObjVals = [];
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    if (typeof value == 'object') {
      listOfObjVals.push({ key });
      listOfObjVals = listOfObjVals.concat(getListOfObjValsRecursively(value));
    } else {
      value = value.toString();
      listOfObjVals.push({ key, value });
    }
  });

  return listOfObjVals;
};
