// require path and fs modules
const path = require('path');
const fs = require('fs');

// joining path of directory
const directoryPath = path.join(__dirname, 'scripts');
console.log('watching for changes in ' + directoryPath);

// watch for changes to the data directory
fs.watch('scripts/',{ 'recursive': true }, function(eventType, filename){  
  var fullPathFileName = directoryPath + '/' + filename;
  console.log(fullPathFileName);

  // every time a file is saved
  // send script to adobe illustrator
  runAIScript(fullPathFileName);

});

// Run AI jsx script
function runAIScript(path) {
  // run jsx with osascript
  var cmd;
  if (path) {
    // define osascript command
    cmd = 'osascript -e \'tell application \"Adobe Illustrator\"\' -e \'activate\' -e \'do javascript \"#include \'' + path + '\'\"\' -e \'end tell\'';
  } else {
    // Launch AI
    cmd = 'osascript -e \'tell application \"Adobe Illustrator\"\' -e \'activate\' -e \'end tell\'';
  }
  //console.log(cmd);
  require('child_process').exec(cmd); // run without error debug
}