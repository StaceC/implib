import { Track } from '../models';
import * as yauzl from "yauzl";
import { ZipFile, Entry } from "yauzl";
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
    try{
      var track: Track = <Track>{};

      yauzl.open((file as any).path, {autoClose: true, lazyEntries: true}, function(err:any, zipfile: ZipFile) {

        if (err) reject(err);

        // TODO: Note, this is the error that gets thrown and is now being captured from SHARK-32.
        // The rest of the try/catch and on error events in this littered around here are precautionary.
        zipfile.on('error', error => {
          //console.log("This is an error here! " + error);
          zipfile.emittedError = true;
          track.error = error;
          reject(error);
        });

        zipfile.on('close', () => {
          if(!track.error) {
            resolve(track);
          }
        });

        zipfile.on("entry", function(entry: Entry) {
          if (/\/$/.test(entry.fileName)) {
            // DIRECTORY
            // Directory file names end with '/'.
            // Note that entires for directories themselves are optional.
            // An entry's fileName implicitly requires its parent directories to exist.
            // console.log("Zip Directory: " + entry.fileName);
            const dirname = entry.fileName.replace(/\/$/, "");
            track.name = dirname;
            //console.log("Dirname[" + dirname + "]");
            fs.mkdir(path.join(SAVE_DIR, dirname), function(error: any){
              if(!error || (error && error.code === 'EEXIST')){
                //console.log("Created directory [" + dirname + "]");
                //do something with contents
              } else {
                //debug
                reject(error);
                //console.log("Unable to create directory [" + dirname + "]" + error);
              }
            });

          } else {
            // FILE ENTRY
            zipfile.openReadStream(entry, function(err, readStream) {
              if (err) reject(err);

              if(readStream) {
                readStream.on("end", function() {
                  zipfile.readEntry();
                });
                readStream.on("error", function(error) {
                  reject(new Error("Unable to read stream. " + error));
                });
                //console.log("Zip FileName: " + entry.fileName);
                //var filename = entry.fileName.replace(/^.*[\\\/]/, '')
                //console.log("Filename: [" + filename + "]");
                try {
                  const writeStream = fs.createWriteStream(path.join(SAVE_DIR, entry.fileName));
                  writeStream.on('error', error => {
                    //console.log(error);
                    reject(new Error("WriteStream Failed. " + error));
                  });
                  readStream.pipe(writeStream);
                } catch (error) {
                  reject(new Error("Read Stream Failed. " + error));
                }
              } else {
                reject(new Error("Unable to read file stream. Entry[" + entry.fileName + "]"));
              }
            });
          }
          // Check if the zip file is still open and read the next entry
          if(zipfile.isOpen) {
            zipfile.readEntry();
          }
        });

        zipfile.readEntry();

      });
    } catch(error) {
      //console.log("ERROR HERE!");
      reject(error);
    }
  })
}
