import jwt from "./jwt.js";
import customerRepository from "./customer-repository.mjs";
import secretsManager from "./secrets-manager.mjs";

export const handler = async (event) => {
    try {
        // console.log(`Event: ${JSON.stringify(event)}`);

        const customer = await customerRepository.findByDocument(event.body.document);
        const payload = { uuid: customer.uuid };

        // const payload = { uuid: event.body.document };
        const signerParams = await secretsManager.retrieve(process.env.SIGNER_SECRET_ID);

        const response = await jwt.sign(payload, signerParams);

        return {
            ...response,
            'statusCode': 200
        };
    } catch (error) {
        console.error(`Handler error: ${JSON.stringify(error)}`);
        return {
            ...error,
            'statusCode': 401
        };
    }
};