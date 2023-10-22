import jsonwebtoken from "jsonwebtoken";

export default {

    sign: (payload, signerParams) => new Promise(async (resolve, reject) => {
        jsonwebtoken.sign(payload, signerParams.privateKey, { algorithm: signerParams.algorithm, expiresIn: process.env.JWT_EXPIRATION }, function(error, token) {
            if (error) {
                console.error(`Error: ${error}`);
                reject(error);
            } else {
                resolve({
                    access_token: token
                });
            }
        });
    })

}