class EntityNotFoundError extends Error {
  /**
   * @param {string} entityName
   * @param {any} criteria
   */
  constructor(entityName, criteria) {
    super(`${entityName} not found`);
    this.name = 'EntityNotFoundError';
    this.statusCode = 404;
    this.criteria = criteria;
  }
}

module.exports = EntityNotFoundError;
