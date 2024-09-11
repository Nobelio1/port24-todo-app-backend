import { Types } from "mongoose";
import { RoomModel } from "../../data/mongo/models/room.model";
import { TodoModel } from "../../data/mongo/models/todo.model";
import { UserModel } from "../../data/mongo/models/user.model";
import { CreatedTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { EditTodoDto } from "../../domain/dtos/todos/edit-todo.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom.error";
import { throws } from "assert";
export class TodoService {
  constructor() {}

  public async createTodo(createdTodoDto: CreatedTodoDto, user: UserEntity) {
    const assignedUserExists = await UserModel.findById(
      createdTodoDto.assignedUser
    );
    if (!assignedUserExists) throw CustomError.badRequest("User not exists");
    const roomExists = await RoomModel.findById(createdTodoDto.room);
    if (!roomExists) throw CustomError.badRequest("room not exists");

    try {
      const todo = new TodoModel({
        ...createdTodoDto,
        creatorUser: user.id,
      });

      await todo.save();
      return {
        code: "000",
        message: "Se guardo correctamente",
      };
    } catch (error) {
      return CustomError.internalServer(`${error}`);
    }
  }

  public async editTodo(editTodoDto: EditTodoDto, idTodo: string) {
    if (!idTodo) throw CustomError.badRequest("Todo ID not exists");
    const todo = await TodoModel.findById(idTodo);
    if (!todo) throw CustomError.badRequest("todo not existis");
    try {
      todo.title = editTodoDto.title;
      todo.assignedUser = new Types.ObjectId(editTodoDto.assignedUser);
      todo.state = editTodoDto.state;
      todo.room = new Types.ObjectId(editTodoDto.room);

      await todo.save();

      return {
        code: "000",
        messsage: "Se actulizo correctamente",
      };
    } catch (error) {
      console.log(error);
      return CustomError.internalServer(`${error}`);
    }
  }

  public async deleteTodo(idTodo: string) {
    const todo = await TodoModel.findById(idTodo);
    if (!todo) throw CustomError.badRequest("Todo id not exists");

    try {
      todo.isActive = false;
      await todo.save();

      return {
        code: "000",
        message: "Se elimino correctamente",
      };
    } catch (error) {
      return CustomError.internalServer(`${error}`);
    }
  }

  public async getTodosByUser(idUser: string, idRoom: string) { //todo: Modificar para filtar por room
    const user = await UserModel.findById(idUser);
    if (!user) throw CustomError.badRequest("User not exists");
    const roomExists = await RoomModel.findById(idRoom)
    if(!roomExists) throw CustomError.badRequest("Room not exists")

    try {
      const todos = await TodoModel.find({
        assignedUser: new Types.ObjectId(idUser),
        room: roomExists.id,
        isActive: true,
      });

      return {
        code: "000",
        message: "Se consulto correctamente",
        data: todos,
      };
    } catch (error) {
      return CustomError.internalServer(`${error}`);
    }
  } 

  public async getAllTodos(user: UserEntity) {
    const userAdmin = await UserModel.findById(user.id)
    if(userAdmin?.role[0] !== 'ADMIN_ROLE') throw CustomError.unauthorized("Unauthorized user")
    
    try {
      const todos = await TodoModel.find({
        isActive: true,
      })
      return {
        code: "000",
        message: "Se consulto correctamente",
        data: todos,
      };

    } catch (error) {
      return CustomError.internalServer(`${error}`)
    } 
  }
}