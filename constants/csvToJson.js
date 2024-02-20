const fs = require('fs');

const inputFile = 'ruleTable_fdda3.csv';
const outputFile = 'ruleTable_fdda3.json';

function convertToJSON(csvData) {
    const lines = csvData.trim().split('\n');
    const headers = lines.shift().split(',');
  
    const jsonData = {};
  
    for (const line of lines) {
      const values = line.split(',');
      const row = {};
  
      for (let i = 1; i < values.length; i++) {
        row[headers[i]] = parseInt(values[i].trim());
      }
  
      jsonData[values[0].trim()] = row;
    }
  
    return jsonData;
  }
  
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading CSV file:', err);
      return;
    }
  
    const jsonData = convertToJSON(data);
  
    fs.writeFile(outputFile, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error('Error writing to JSON file:', err);
      } else {
        console.log('Conversion completed successfully.');
      }
    });
  });