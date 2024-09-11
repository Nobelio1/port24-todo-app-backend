import mongoose from "mongoose";

export class CreatedTodoDto {
  private constructor(
    public title: string,
    public assignedUser: string,
    // public creatorUser: number, ----- Ingresas por JWT
    public room: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreatedTodoDto?] {
    const { title, assignedUser, room } = object;

    if (!title) return ["Missing title"];
    if (!assignedUser) return ["Missing assignedUser"];
    if (!mongoose.Types.ObjectId.isValid(assignedUser)) return ["Invalid assignedUser ID"];
    if (!room) return ["Missing room"];
    if (!mongoose.Types.ObjectId.isValid(room)) return ["Invalid room ID"];

    return [undefined, new CreatedTodoDto(title, assignedUser, room)];
  }
}
