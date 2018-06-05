export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type IState = { todos: Todo[], isFetching: boolean };

export type Todos = Todo[];

export type Stem = {
  id: string;
  name: string;
  completed: boolean;
}

export type Track = {
  id: string;
  name: string;
  completed: boolean;
  error: any;
  configFile: string;
  stems: Stem[];
}
