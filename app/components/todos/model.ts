export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type IState = { todos: Todo[], isFetching: boolean };
