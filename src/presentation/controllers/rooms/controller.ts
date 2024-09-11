import { CustomError } from "../../../domain/errors/custom.error";
import { Request, Response } from 'express';
import { RoomService } from "../../services/room.service";
import { CreatedRoomDto } from "../../../domain/dtos/rooms/create-room.dto";

export class RoomController {
  constructor(public readonly roomService: RoomService){}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server errror" });
  };

  createRoom = (req: Request, res: Response) => {
    const [error, createdRoomDto] = CreatedRoomDto.create(req.body)
    if(error) return res.status(400).json({error})
    
    this.roomService.createRoom(createdRoomDto!, req.body.user)
      .then(room => res.json(room))
      .catch(error => this.handleError(error, res))
  }

  getAllRooms = (req: Request, res: Response) => {
    this.roomService.getAllRooms(req.body.user)
      .then(room => res.json(room))
      .catch(error => this.handleError(error, res))
  }

  getRoomsById = (req: Request, res: Response) => {
    const {id} = req.params
    if( !id ) return res.status(400).json({error: 'idUser not exists'})
    
    this.roomService.getRoomsById(id)
      .then(room => res.json(room))
      .catch(error => this.handleError(error, res))
  }

  deleteRoom = (req: Request, res: Response) => {
    const {id} = req.params
    if( !id ) return res.status(400).json({error: 'idRoom not exists'})
    
    this.roomService.deleteRoom(id, req.body.user)
      .then(room => res.json(room))
      .catch(error => this.handleError(error, res))
  }

}