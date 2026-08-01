const fs = require('fs');
const path = require('path');

function flattenFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(filePath + ' does not exist');
    return;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (data.questions) {
    data.questions = data.questions.map(q => {
      if (q.question && typeof q.question === 'object') {
        q.question = q.question.bn || q.question.en || '';
      }
      if (q.explanation && typeof q.explanation === 'object') {
        q.explanation = q.explanation.bn || q.explanation.en || '';
      }
      if (q.options) {
        q.options = q.options.map(o => {
          if (o.text && typeof o.text === 'object') {
            o.text = o.text.bn || o.text.en || '';
          }
          return o;
        });
      }
      return q;
    });
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Processed ' + filePath);
}

flattenFile(path.join(__dirname, 'backend/questions.json'));
flattenFile(path.join(__dirname, 'src/data/questions.json'));
