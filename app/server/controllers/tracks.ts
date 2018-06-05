import {Router, Request, Response } from 'express';
import db from "../../db/models";
import fs = require("fs");
import path = require("path");
//import { Todo } from "../../components/todos/model";
import config from "../../config";
const SAVE_DIR = config.settings.saveDir;

const router: Router = Router();

// GET todos listing.
router.get('/', (req: Request, res: Response) => {
  db.Todo.findAll({ raw: true })
  .then(todos => res.send(todos));
});

// Get todo info.
router.get('/:todoId', (req: Request, res: Response) => {
  const todoId = req.params.todoId;
  db.Todo.findById(todoId)
  .then(todo => res.send(todo));
});

// Get todo info.
router.get('/:todoId/config', (req: Request, res: Response) => {
  const todoId = req.params.todoId;
  db.Todo.findById(todoId)
  .then((todo) => {
    if(todo) {
      const configFilePath = path.join(SAVE_DIR, todo.text, "config.json");
      fs.readFile(configFilePath, 'utf8', function(err, data) {
        if (err) {
          console.log("Unable to load config file [" + configFilePath + "]");
          res.status(404).send("Unable to load config file.");
        } else {
          try {
            const configFile = JSON.parse(data);
            res.send(configFile);
            console.log("Sent config file for [" + todoId + "]");
          } catch(e) {
            console.log("Unable to parse config file [" + configFilePath + "]");
            res.status(500).send("Unable to parse config file.");
          }

        }
      });
    } else {
      // error
      console.log("No todo was found with id [" + todoId + "] in the DB");
      res.status(404).send("No element with id[" + todoId + "]");
    }
    // Read config file and convert to json the send
  });
});


export const TracksController: Router = router;
