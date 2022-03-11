const fs = require("fs");
const path = require("path");
const _ = require("underscore");
const counter = require("./counter");

// var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    if (err) {
      callback(err, null);
    } else {
      //success
      var filePath = `${exports.dataDir}/${id}.txt`;
      fs.writeFile(filePath, text, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, { id, text });
        }
      });
    }
  });
  // items[id] = text;
};
exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      throw "error reading file";
    } else{

      var data = _.map(files, (file) => {
        var id = file.split(".")[0];
        // console.log('testing: ', file);
        var text = fs.readFile(`${exports.dataDir}/${id}.txt`, 'utf8');

        return { id, text };
      });
    }
  });

  callback(null, data);
};
  // Promise.all(data).then(
  //   (todos) => callback(null, todos),
  //   (err) => callback(err)
  // );
  // var data = _.map(items, (text, id) => {
  // });

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, "data");

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
