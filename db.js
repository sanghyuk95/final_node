const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "database-1.cixoxvhojmog.ap-northeast-2.rds.amazonaws.com",
  user: "shskse5",
  password: "chltkdgur5",
  database: "final_project",
  connectionLimit: 30,
});

function getConnection(callback) {
  pool.getConnection(function (err, conn) {
    if (!err) {
      callback(conn);
    }
  });
}

module.exports = getConnection;
