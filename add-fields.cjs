const fs = require('fs');
const path = require('path');

function addFields(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(filePath + ' does not exist');
    return;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (data.questions && data.questions.length > 0) {
    data.questions[0].partName = 'General Knowledge Part 1';
    data.questions[0].chapterName = 'History of Bengal';
    
    if (data.questions.length > 1) {
      data.questions[1].partName = 'Mathematics Paper 1';
      data.questions[1].chapterName = 'Algebra basics';
    }
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Processed ' + filePath);
}

addFields(path.join(__dirname, 'backend/questions.json'));
addFields(path.join(__dirname, 'src/data/questions.json'));
