import { regularExps } from "../../../config/regular-exp";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string,
    public room: number,
    public role: number
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password, room, role } = object;

    if (!name) return ["Missing name"];
    if (!email) return ["Missing email"];
    if (!regularExps.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Missing password"];
    if (password.length < 6) return ["Password too short"];
    if (role === undefined || role === null || typeof role !== "number")
      return ["Missing role"];
    // if (room === undefined || room === null || typeof room !== "number")
     //return ["Missing room"];

    return [undefined, new RegisterUserDto(name, email, password, room, role)];
  }
}
