import { CreatedTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { EditTodoDto } from "../../domain/dtos/todos/edit-todo.dto";
import { UserEntity } from "../../domain/entities/user.entity";
export class TodoService {
  constructor() {}

  public async createTodo(createdTodoDto: CreatedTodoDto, user: UserEntity) {}

  public async editTodo(editTodoDto: EditTodoDto) {}

  public async deleteTodo(idTodo: number) {}

  public async getTodosByUser(idUser: string) {}

  public async getAllTodos(user: UserEntity){}

}
