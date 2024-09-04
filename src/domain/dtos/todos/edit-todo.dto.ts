
export class EditTodoDto {
  private constructor(
    public title: string,
    public assignedUser: string,
    public state: number,
    public room: string
  ) {}

  static create(object: { [key: string]: any }): [string?, EditTodoDto?] {
    const { title, assignedUser, state, room } = object;

    if (!title) return ["Missing title"];
    if (!assignedUser) return ["Missing assignedUser"];
    if (!room) return ["Missing room"];
    if (!state) return ["Missing state"];

    return [undefined, new EditTodoDto(title, assignedUser, state, room)];
  }
}
