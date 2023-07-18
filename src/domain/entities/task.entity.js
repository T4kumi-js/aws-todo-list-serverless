class Task {
  /**
   * @param {{
   *   id?: string,
   *   name: string,
   *   description: string,
   *   isCompleted: boolean,
   *   createdAt?: Date,
   *   updatedAt?: Date
   * }} props
   */
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.isCompleted = props.isCompleted;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}

module.exports = Task;
