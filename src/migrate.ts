import { connectionSource } from './typeorm.config';

connectionSource
  .initialize()
  .then(async () => {
    await connectionSource.runMigrations();
    console.log('✅ Migrations complete');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Migration error:', err);
    process.exit(1);
  });