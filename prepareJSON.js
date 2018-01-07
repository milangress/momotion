const fs = require('fs');

let jsonData;

const filePath = "public/mo_data_123.json"

console.log('\x1b[32m%s\x1b[0m', `start Reading ${filePath}`) 


try {
   jsonData = JSON.parse(fs.readFileSync(filePath));
} catch ( err ) {
   console.log('\x1b[31m%s\x1b[0m', `ERROR reading: ${filePath}`)
}

console.log(`Lenght of input Array: ${jsonData.data.length}`);

const movementType = jsonData.movementType

console.log(`Type of Movement: ${movementType}`);


const foldm = function(arr,chunk) {
  return arr.reduce((a,b,i,g) => 
           !(i % chunk) ? a.concat([g.slice(i,i+chunk)]) : a, []);
}

jsonData.data = foldm(jsonData.data, 66);
jsonData.data.pop();

//console.log(jsonData.data);
console.log(`Lenght of Array of Arrays: ${jsonData.data.length}`);


const flipDirection = function (arrays) {
  console.log('flipDirection Function');
  for (let i = 0; i < arrays.length; i++) {
    var arr = arrays[i];
    for (let j = 0; j < arr.length; j++) {
      arr[j].x = arr[j].x * -1;
      arr[j].y = arr[j].y * 1;
      arr[j].z = arr[j].z * 1;
    }
  }
  let newArrays = Array.from(arrays);
  return newArrays;
}

//console.log(flipDirection(jsonData.data));


// Deep Clone Object
let newJsonData = JSON.parse(JSON.stringify(jsonData.data));

// 
let allData = jsonData.data.concat(flipDirection(newJsonData));

jsonData.data = allData


console.log(`Lenght of Array nach flip: ${jsonData.data.length}`);

const writeDataToFile = function(data) {
  const fileID = Math.floor(Math.random() * 10000) + 10000;
  const newFilePath = `public/mo_data_${movementType}_${fileID}.json`

      console.log('\x1b[32m%s\x1b[0m', `written to ${newFilePath}`) 
      fs.appendFileSync(newFilePath, JSON.stringify(data, null, 2) , 'utf-8');
}

writeDataToFile(jsonData);







const splitArrayAtTime = function(arr, startVal, endVal) {

  if (startVal === !0) {
  let startPos = arr.findIndex(array => {
    return array.t === startVal
  });
  } else {
    let startPos = 0;
  }

  let endPos = arr.findIndex(array => {
    return array.t === endVal;
  });
  return arr.splice(startPos, endPos);
}

