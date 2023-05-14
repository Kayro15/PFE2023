const { spawn } = require('child_process');
const path = require('path');
exports.runPythonScript = (req, res) => {
  const python = spawn('python', [
    "D:/akrem/Documents/Pinops/main.py",
    "D:/akrem/Documents/Pinops/Services/ResumeExtraction.py",
    "D:/akrem/Documents/Pinops/Services/Rules.py",
    "D:/akrem/Documents/Pinops/Services/JobExtraction.py",
    "D:/akrem/Documents/Pinops",
    "D:/akrem/Documents/Pinops/Resources/data/degrees.jsonl",
    "D:/akrem/Documents/Pinops/Resources/data/skills.jsonl",
    "D:/akrem/Documents/Pinops/Resources/data/majors.jsonl",
    "D:/akrem/Documents/Pinops/Resources/data/labels.json",
  ]);
 
  python.stdout.on('data', (data) => {
    console.log('Python script output:', data.toString());
  });

  python.stderr.on('data', (data) => {
    console.error('Python script error:', data.toString());
  });

  python.on('close', (code) => {
    console.log(`Python script exited with code ${code}`);
    res.status(200).json({ message: 'Python script executed successfully.' });
  });
};
