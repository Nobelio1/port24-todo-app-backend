import { CustomError } from "../errors/custom.error";

export class TodoEntity {
  constructor(
    public id: string,
    public title: string,
    public state: number,
    public isActive: boolean,
    public assignedUser: string,
    public creatorUser: string,
    public room: string
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, title, state, isActive, assignedUser, creatorUser, room } = object;

    if (!id) throw CustomError.badRequest("Missing id");
    if (!title) throw CustomError.badRequest("Missing title");
    if (!state) throw CustomError.badRequest("Missing state");
    if (!assignedUser) throw CustomError.badRequest("Missing assignedUser");
    if (!creatorUser) throw CustomError.badRequest("Missing creatorUser");
    if (!room) throw CustomError.badRequest("Missing room");
    if (isActive === undefined) throw CustomError.badRequest("Missing isActive");

    return new TodoEntity(id, title, state, isActive, assignedUser, creatorUser, room);
  }
}
