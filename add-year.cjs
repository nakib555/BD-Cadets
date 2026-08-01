const fs = require('fs');
const path = require('path');

function addYear(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(filePath + ' does not exist');
    return;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (data.questions && data.questions.length > 0) {
    data.questions[0].year = 2023;
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Processed ' + filePath);
}

addYear(path.join(__dirname, 'backend/questions.json'));
addYear(path.join(__dirname, 'src/data/questions.json'));
