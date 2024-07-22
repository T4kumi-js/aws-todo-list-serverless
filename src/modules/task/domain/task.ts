type TaskProps = {
  id?: string;
  name: string;
  description: string;
  isCompleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

class Task {
  public id?: string;
  public name: string;
  public description: string;
  public isCompleted: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: TaskProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.isCompleted = props.isCompleted;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}

export default Task;
