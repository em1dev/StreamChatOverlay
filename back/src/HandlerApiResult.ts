import { Response } from 'express';

export class HandlerApiResult<T>
{
  private _data?: T;
  private _status: number;
  private _error?: string;

  private constructor(status: number, data?: T, errorDescription?: string) {
    this._data = data;
    this._status = status;
    this._error = errorDescription;
  }

  public static Error = <U>(status: number, description: string) => (
    new HandlerApiResult<U>(status, undefined, description)
  );

  public static Success = <U>(status: number, data: U) => (
    new HandlerApiResult<U>(status, data)
  );

  public sendResult(res: Response)
  {
    res.status(this._status);
    if (this._error){
      res.send({ error: this._error });
      return;
    }
    if (this._data) {
      res.send(this._data);
      return;
    }
    res.send();
  }
}
