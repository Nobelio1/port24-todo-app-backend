import { Router } from "express";
import { RoomService } from "../../services/room.service";
import { RoomController } from "./controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

export class RoomRoutes {
  static get routes(): Router {
    const router = Router()
    const roomService = new RoomService()
    const controller = new RoomController(roomService)

    router.post('/create',[AuthMiddleware.validateJWT], controller.createRoom)
    router.get('/rooms',[AuthMiddleware.validateJWT], controller.getAllRooms)
    router.post('/rooms/:id', controller.getRoomsById)
    router.post('/delete/:id',[AuthMiddleware.validateJWT], controller.deleteRoom)

    return router
  }

}