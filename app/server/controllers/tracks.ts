import {Router, Request, Response } from 'express';
import db from "../../db";
import fs = require("fs");
import path = require("path");
import config from "../../config";
const SAVE_DIR = config.settings.saveDir;

const router: Router = Router();

// GET tracks listing.
router.get('/', (req: Request, res: Response) => {
  db.Track.findAll({ raw: true })
  .then(tracks => res.send(tracks));
});

// Get track info.
router.get('/:trackId', (req: Request, res: Response) => {
  const trackId = req.params.trackId;
  db.Track.findById(trackId)
  .then(track => res.send(track));
});

// Get todo info.
router.get('/:trackId/config', (req: Request, res: Response) => {
  const trackId = req.params.trackId;
  db.Track.findById(trackId)
  .then((track) => {
    if(track) {
      const configFilePath = path.join(SAVE_DIR, track.name, "config.json");
      fs.readFile(configFilePath, 'utf8', function(err, data) {
        if (err) {
          console.log("Unable to load config file [" + configFilePath + "]");
          res.status(404).send("Unable to load config file.");
        } else {
          try {
            const configFile = JSON.parse(data);
            res.send(configFile);
            console.log("Sent config file for [" + trackId + "]");
          } catch(e) {
            console.log("Unable to parse config file [" + configFilePath + "]");
            res.status(500).send("Unable to parse config file.");
          }

        }
      });
    } else {
      // error
      console.log("No track was found with id [" + trackId + "] in the DB");
      res.status(404).send("No element with id[" + trackId + "]");
    }
  });
});


export const TracksController: Router = router;
