import { Track } from '../components/library';
import * as yauzl from "yauzl";
import { ZipFile, Entry} from "yauzl";
import fs = require('fs');
const path = require('path');

var SAVE_DIR  = "";

const env = process.env.NODE_ENV || "development";
const appConfig = require(`${__dirname}/../config/appConfig.json`)[env];

if (env == "production") {
  SAVE_DIR = path.join(
    require("electron").remote.app.getPath("appData"),
    //appConfig.appName,
    appConfig.tracksDirName);
} else {
  SAVE_DIR = path.join(appConfig.tracksDirName);
}

export function unpackArchive(file: File): Promise<Track> {
  return new Promise(function (resolve,reject) {
    var track: Track = <Track>{};

    yauzl.open((file as any).path, {autoClose: true, lazyEntries: true}, function(err:any, zipfile: ZipFile) {
      if (err) throw err;
      zipfile.readEntry();
      zipfile.on("entry", function(entry: Entry) {
        if (/\/$/.test(entry.fileName)) {
          // Directory file names end with '/'.
          // Note that entires for directories themselves are optional.
          // An entry's fileName implicitly requires its parent directories to exist.
          console.log("Zip Directory: " + entry.fileName);
          const dirname = entry.fileName.replace(/\/$/, "");
          track.name = dirname;
          console.log("Dirname[" + dirname + "]");
          fs.mkdir(path.join(SAVE_DIR, dirname), function(e: any){
            if(!e || (e && e.code === 'EEXIST')){
              console.log("Created directory [" + dirname + "]");
              //do something with contents
            } else {
              //debug
              console.log("Unable to create directory [" + dirname + "]" + e);
            }
          });

        } else {
          // file entry
          zipfile.openReadStream(entry, function(err, readStream) {
            if (err) throw err;
            if(readStream) {
              readStream.on("end", function() {
                zipfile.readEntry();
              });
              console.log("Zip FileName: " + entry.fileName);
              //var filename = entry.fileName.replace(/^.*[\\\/]/, '')
              //console.log("Filename: [" + filename + "]");
              readStream.pipe(fs.createWriteStream(path.join(SAVE_DIR, entry.fileName)));
            }
          });
        }
        // Check if the zip file is still open and read the next entry
        if(zipfile.isOpen) {
          zipfile.readEntry();
        }

        resolve(track);
      });
    });
  })
}
