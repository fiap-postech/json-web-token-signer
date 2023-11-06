import mysql from "mysql2";
import secretsManager from "./secrets-manager.mjs";

const databaseParams = await secretsManager.retrieve(process.env.DATABASE_SECRET_ID);

const con = mysql.createConnection({
    host: await databaseParams.host,
    user: await databaseParams.username,
    password: await databaseParams.password,
    database: await databaseParams.schema,
    port: await databaseParams.port
});

export default {

    findByDocument: (document) => new Promise(async (resolve, reject) => {
        con.connect(function(connectionError) {
            if (connectionError) {
                console.error(`Customer connection error: ${connectionError}`);
                reject({
                    message: "Finding customer error"
                });
            } else {
                const query = `SELECT * FROM customer WHERE document = '${document}'`;

                con.query(query, function (queryError, result) {
                    if (queryError) {
                        console.error(`Customer query error: ${queryError}`);
                        reject({
                            message: "Finding customer error"
                        });
                    } else {
                        if (result.length === 0) {
                            reject({
                                message: "Customer not found"
                            });
                        } else {
                            resolve({
                                document: result[0].document,
                                uuid: result[0].uuid
                            });
                        }
                    }
                });
            }
        });
    })

}