export class CreatedRoomDto {
  private constructor(
    public title: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreatedRoomDto?] {
    const { title } = object;

    if (!title) return ["Missing title"];

    return [undefined, new CreatedRoomDto(title)];
  }
}
