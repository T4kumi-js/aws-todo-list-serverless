/**
 * @interface
 */
class IDeleteTaskUseCase {
  /**
   * @param {string} taskId
   * @returns {Promise<void>}
   */
  execute(taskId) {}
}

module.exports = IDeleteTaskUseCase;
