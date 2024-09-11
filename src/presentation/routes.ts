import { Router } from "express";
import { AuthRoutes } from "./controllers/auth/routes";
import { TodoRoutes } from "./controllers/todos/routes";
import { RoomRoutes } from "./controllers/rooms/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/todos", TodoRoutes.routes)
    router.use("/api/rooms", RoomRoutes.routes)

    return router;
  }
}
