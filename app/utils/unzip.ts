import { Track } from '../components/library';

const path = require('path');
const unpack = require('cross-unzip').unzip;
const env = process.env.NODE_ENV || "development";
const appConfig = require(`${__dirname}/../config/appConfig.json`)[env];

var SAVE_DIR  = "";

if (env == "production") {
  SAVE_DIR = path.join(
    require("electron").remote.app.getPath("appData"),    
    appConfig.tracksDirName);
} else {
  SAVE_DIR = path.join(appConfig.tracksDirName);
}

export function unpackArchive(file: File): Promise<Track> {

  return new Promise(function (resolve,reject) {

    const trackname = file.name.replace(/\.[^/.]+$/, "");
    var track: Track = <Track>{};

    track.name = trackname;
    //console.log("Unpacking file[" + file.name + "] to dir[" + path.join(SAVE_DIR, trackname) + "]");
    unpack((file as any).path, SAVE_DIR, (error: any) => {
      if(error) {
        reject(error);
      } else {
        resolve(track);
      }
    });
  });

}
