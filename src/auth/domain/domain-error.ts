export interface IDomainException {
  statusCode: number;
  message: string[];
  error: string;
}

export class DomainError extends Error {
  private status: number;

  constructor(message = 'Domain Error', status = 406) {
    super(message);
    this.status = status;
  }

  getStatus() {
    return this.status;
  }

  getResponse(): IDomainException {
    return {
      statusCode: this.status,
      message: [this.message],
      error: 'Domain Error',
    };
  }
}
