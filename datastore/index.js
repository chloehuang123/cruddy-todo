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
      callback(null, data);
    } else {
      var data = files.map(file => {
        let id = file.split('.')[0];
        return {id: id, text: id};
      });
      callback(null, data);
    }
  });


};

exports.readOne = (id, callback) => {
  fs.readFile(`${exports.dataDir}/${id}.txt`, 'utf8', (err, text) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, {id, text});
    }
  });
};

exports.update = (id, text, callback) => {
  var address = `${exports.dataDir}/${id}.txt`;
  if (fs.existsSync(address)) {
    fs.writeFile(address, text, (err) => {
      if (err) {
        console.error(`Can't update at the current address`)
      } else {
        callback(null, {id, text})
      }
    });
  } else {
    callback(new Error(`No item with id: ${id}`));
  }
};

exports.delete = (id, callback) => {
  var address = `${exports.dataDir}/${id}.txt`;
  fs.unlink(address, err => {
    if (err) {
      callback(err, null);
    } else {
      callback(null);
    }
  })
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, "data");

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
