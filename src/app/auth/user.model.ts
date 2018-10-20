export class User {
  constructor(
    public email: String,
    public password: String,
    public firstName: String,
    public lastName: String,
    public _id?: string
  ) {}

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
