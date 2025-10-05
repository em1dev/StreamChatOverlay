import { db, Table, UserSettingsColumnKey } from '../db';

const runMigrations = () => {
  console.log('Running migrations');
  createTable();
};

const createTable = () => {
  console.log('Creating table');
  db.run(`
CREATE TABLE IF NOT EXISTS ${Table.UserSettings} (
  ${UserSettingsColumnKey.Id} INTEGER PRIMARY KEY AUTOINCREMENT,
  ${UserSettingsColumnKey.UserId} INT NOT NULL,
  ${UserSettingsColumnKey.SettingsJson} TEXT NOT NULL,
  ${UserSettingsColumnKey.SecretKey} TEXT NOT NULL
);
`, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

runMigrations();