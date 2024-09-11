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
    const {id} = req.params
    const [error, editTodoDto] = EditTodoDto.create(req.body)
    if(error) return res.status(400).json({error})
    
    this.todoService.editTodo(editTodoDto!, id)
      .then(todo => res.json(todo))
      .catch(error => this.handleError(error, res))
  }

  deleteTodo = (req: Request, res: Response) => {
    const {id} = req.params 
    if( !id ) return res.status(400).json({error: 'idTodo is invalid'})

    this.todoService.deleteTodo(id)
      .then(todo => res.json(todo))
      .catch(error => this.handleError(error,res))
  }

  getTodosByUserAndRoom = (req: Request, res: Response) => {
    const {id, room} = req.params 
    if( !id || !room ) return res.status(400).json({error: 'idTodo is invalid'})
    
    this.todoService.getTodosByUser(id, room)
      .then(todo => res.json(todo))
      .catch(error => this.handleError(error, res))
  }

  getAllTodos = (req: Request, res: Response) => {
    this.todoService.getAllTodos(req.body.user)
      .then(todos => res.json(todos))
      .catch(error => this.handleError(error, res))
  }
  
}