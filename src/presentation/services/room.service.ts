import { RoomModel } from "../../data/mongo/models/room.model";
import { UserModel } from "../../data/mongo/models/user.model";
import { CreatedRoomDto } from "../../domain/dtos/rooms/create-room.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class RoomService {
  constructor(){}

  public async createRoom(createdRoomDto: CreatedRoomDto, user: UserEntity) {
    const roomCreatedExist = await RoomModel.findOne({title: createdRoomDto.title})
    if(roomCreatedExist) throw CustomError.badRequest("Room already exists ")
    const userAdmin = await UserModel.findById(user.id)
    if(userAdmin?.role[0] !== 'ADMIN_ROLE') throw CustomError.unauthorized("Unauthorized user")
    
    try {
      const todo = new RoomModel({
        ...createdRoomDto,
        creatorUser: user.id
      })
      
      await todo.save()
      return {
        code: "000",
        message: "Se guardo correctamente",
      };
    } catch (error) {
      return CustomError.internalServer(`${error}`)
    }
  }

  public async getAllRooms(user: UserEntity) {
    const userAdmin = await UserModel.findById(user.id)
    if(userAdmin?.role[0] !== 'ADMIN_ROLE') throw CustomError.unauthorized("Unauthorized user")
    
    try {
      const rooms = await RoomModel.find({
        isActive: true,
      })
      return {
        code: "000",
        message: "Se consulto correctamente",
        data: rooms,
      };

    } catch (error) {
      return CustomError.internalServer(`${error}`)
    }
  }
  
  public async getRoomsById(idUser: string) {
    const user = await UserModel.findById(idUser);
    if (!user) throw CustomError.badRequest("User not exists");

    try {
      const rooms = await RoomModel.findById(user.room)
      return {
        code: "000",
        message: "Se consulto correctamente",
        data: {
          id: rooms?.id,
          name: rooms?.title
        }
      }
    } catch (error) {
      return CustomError.internalServer(`${error}`)
    }
  }
  
  public async deleteRoom(idRoom: string, user: UserEntity) {
   const roomExists = await RoomModel.findById(idRoom)
   if(!roomExists) throw CustomError.badRequest("Room not exists")

    try {
      roomExists.isActive = false
      await roomExists.save()

      return {
        code: "000",
        message: "Se elimino correctamente",
      };
    } catch (error) {
      return CustomError.internalServer(`${error}`)    
    }
  }
}