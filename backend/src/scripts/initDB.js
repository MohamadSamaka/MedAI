(async () => {
  try {
    const dropDatabase = require('./dropDB');
    await dropDatabase();
    require('../seeds/index');
  } catch (err) {
    console.error("Reseed error:", err);
    process.exit(1);
  }
})();
