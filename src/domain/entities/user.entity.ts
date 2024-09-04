import { CustomError } from "../errors/custom.error";

export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: string[],
    public password: string,
    public state: boolean,
    public room?: string
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, name, email, role, password, state, room } = object;

    if (!id) throw CustomError.badRequest("Missing id");
    if (!name) throw CustomError.badRequest("Missing name");
    if (!email) throw CustomError.badRequest("Missing email");
    if (!role) throw CustomError.badRequest("Missing role");
    if (!password) throw CustomError.badRequest("Missing password");
    if (state === undefined) throw CustomError.badRequest("Missing state");

    return new UserEntity(id, name, email, role, password, state, room);
  }
}
