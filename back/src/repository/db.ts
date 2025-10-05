/* eslint-disable @typescript-eslint/no-unused-expressions */
import sqlite, { RunResult } from 'sqlite3';

const databaseName = 'db.db';

export enum Table {
  UserSettings = 'userSettings',
}

export enum UserSettingsColumnKey {
  Id = 'id',
  UserId = 'userId',
  SettingsJson = 'settingsJson',
  SecretKey = 'secretKey'
}

export const db = new sqlite.Database(databaseName, (err) => {
  if (err) {
    console.error('Error connecting to databse', err);
  }
});

const run = (sql: string, params?: unknown) => (
  new Promise<RunResult>((resolve, reject) => {
    db.run(sql, params, function (err) {
      err ? reject(err) : resolve(this);
    });
  })
);

const get = <T>(sql: string, params?: unknown) => (
  new Promise<T | undefined>((resolve, reject) => {
    db.get(sql, params, (err, data) => {
      err ? reject(err) : resolve(data as T | undefined);
    });
  })
);

const all = <T>(sql: string, params?: unknown) => (
  new Promise<Array<T>>((resolve, reject) => {
    db.all(sql, params, (err, data) => {
      err ? reject(err) : resolve(data as Array<T>);
    });
  })
);

export const dbQuery = {
  run,
  get,
  all
};