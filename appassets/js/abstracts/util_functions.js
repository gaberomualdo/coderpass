// function to generate random ID
// some code taken from user csharptest.net on https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
const generateRandomID = (length) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// function to check for valid JSON
// some code taken from user Gumbo on https://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try/3710226
const isValidJSONString = (str) => {
    try {
        JSON.parse(str);
    }catch(e) {
        return false;
    }
    return true;
}

/*
function to get a list of all object keys and vals (recursively); for example:

given the object: { "prop1": "val1", "prop2": {"test": "test_val"} }
the func would yield: [{key: "prop1", val: "val1"}, {key: "test", val: "test_val"}]
*/
const getListOfObjValsRecursive = (obj) => {
    let listOfObjVals = [];
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if(typeof value == "object") {
            listOfObjVals = listOfObjVals.concat(getListOfObjValsRecursive(value));
        }else {
            listOfObjVals.push({key, value});
        }
    });

    return listOfObjVals;
}