class EntityNotFoundError extends Error {
  public statusCode: number;
  public criteria: any;

  constructor(entityName: string, criteria: any) {
    super(`${entityName} not found`);
    this.name = 'EntityNotFoundError';
    this.statusCode = 404;
    this.criteria = criteria;
  }
}

export default EntityNotFoundError;
