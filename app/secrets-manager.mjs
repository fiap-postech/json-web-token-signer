import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient();

export default {

    retrieve: (secretId) => new Promise(async (resolve, reject) => {
        try {
            const response = await client.send(new GetSecretValueCommand({
                    SecretId: secretId
                })
            );
            const value = JSON.parse(response.SecretString);
            resolve(value);
        } catch (e) {
            console.error(`Secrets Manager error: ${e}`);
            reject(e);
        }
    })

}