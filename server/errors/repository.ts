export class RepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RepositoryError";
  }

  static NOT_FOUND() {
    return new RepositoryError(`Entity not found`);
  }

  static DUPLICATE() {
    return new RepositoryError(`Entity already exists`);
  }

  static INVALID() {
    return new RepositoryError(`Invalid entity`);
  }
}
