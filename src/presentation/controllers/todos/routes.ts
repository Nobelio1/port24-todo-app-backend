import { Router } from "express";
import { TodoService } from "../../services/todos.service";
import { TodoController } from "./controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

export class TodoRoutes {

  static get routes() : Router {
    const router = Router()
    const todoService = new TodoService()
    const controller = new TodoController(todoService)

    router.post('/create',[AuthMiddleware.validateJWT],controller.createTodo)
    router.put('/edit/:id',controller.editTodo)
    router.delete('/delete/:id',controller.deleteTodo)
    router.get('/todosByUser/:id/:room',controller.getTodosByUserAndRoom)
    router.get('/todos',[AuthMiddleware.validateJWT],controller.getAllTodos)

    return router
  }
}