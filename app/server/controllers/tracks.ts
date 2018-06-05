import {Router, Request, Response } from 'express';
import db from "../../db/models";

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



export const TracksController: Router = router;
