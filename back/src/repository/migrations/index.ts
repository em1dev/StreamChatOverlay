import { logger } from '../../logger';
import { db, Table, UserSettingsColumnKey } from '../db';

const runMigrations = () => {
  logger.info('Running migrations');
  createTable();
};

const createTable = () => {
  logger.info('Creating table');
  db.run(`
CREATE TABLE IF NOT EXISTS ${Table.UserSettings} (
  ${UserSettingsColumnKey.Id} INTEGER PRIMARY KEY AUTOINCREMENT,
  ${UserSettingsColumnKey.UserId} INT NOT NULL,
  ${UserSettingsColumnKey.SettingsJson} TEXT NOT NULL,
  ${UserSettingsColumnKey.SecretKey} TEXT NOT NULL
);
`, (err) => {
    if (err) {
      logger.error(err);
    }
  });
};

runMigrations();
