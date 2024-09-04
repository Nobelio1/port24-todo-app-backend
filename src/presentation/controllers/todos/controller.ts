import { Request, Response } from 'express';
import { CustomError } from '../../../domain/errors/custom.error';
import { TodoService } from '../../services/todos.service';
import { CreatedTodoDto } from '../../../domain/dtos/todos/create-todo.dto';
import { EditTodoDto } from '../../../domain/dtos/todos/edit-todo.dto';
export class TodoController {
  constructor(public readonly todoService : TodoService){}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server errror" });
  };

  createTodo = (req: Request, res: Response) => {
    const [error, createdTodoDto] = CreatedTodoDto.create(req.body)
    if(error) return res.status(400).json({error})

    this.todoService.createTodo(createdTodoDto!, req.body.user) 
      .then(todo => res.json(todo))
      .catch(error => this.handleError(error,res))
  }

  editTodo = (req: Request, res: Response) => {
    const [error, editTodoDto] = EditTodoDto.create(req.body)
    if(error) return res.status(400).json({error})
    
    this.todoService.editTodo(editTodoDto!)
      .then(todo => res.json(todo))
      .catch(error => this.handleError(error, res))
  }

  deleteTodo = (req: Request, res: Response) => {
    const {idTodo} = req.body //todo --> traer desde parametros
    if( isNaN(idTodo) || !idTodo ) return res.status(400).json({error: 'idTodo is invalid'})

    this.todoService.deleteTodo(idTodo)
      .then(todo => res.json(todo))
      .catch(error => this.handleError(error,res))
  }

  getTodosByUser = (req: Request, res: Response) => {
    const {idUser} = req.body //todo --> traer desde parametros
    if( isNaN(idUser) || !idUser ) return res.status(400).json({error: 'idTodo is invalid'})
    
    this.todoService.getTodosByUser(idUser)
      .then(todo => res.json(todo))
      .catch(error => this.handleError(error, res))
  }

  getAllTodos = (req: Request, res: Response) => {
    this.todoService.getAllTodos(req.body.user)
      .then(todos => res.json(todos))
      .catch(error => this.handleError(error, res))
  }
  
}