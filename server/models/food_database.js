const { Pool } = require("pg");
const PG_URI =
  "postgres://yoaoscnk:O6ubvfQJhEmhoyA9H2AIfEYB1PJMgp9z@jelani.db.elephantsql.com/yoaoscnk";

const pool = new Pool({
  connectionString: PG_URI,
  max: 3,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
