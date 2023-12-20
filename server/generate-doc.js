import express from 'express';
import ExpressSwaggerGenerator from 'express-swagger-generator';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import jsonToYaml from 'json2yaml';
import fs from 'fs';
import swaggerConverter from 'swagger2openapi';
import swaggerOptions from './src/config/swagger.options.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const expressSwaggerGenerator = ExpressSwaggerGenerator(express());
const swaggerDoc = expressSwaggerGenerator(swaggerOptions(__dirname));

fs.writeFileSync('./src/docs/docs_swagger2.yaml', jsonToYaml.stringify(swaggerDoc));

swaggerConverter.convertObj(swaggerDoc, {}, (err, options) => {
    if (err) {
        console.error(err);
    } else {
        const output = jsonToYaml.stringify(options.openapi);

        fs.writeFileSync('./src/docs/docs.yaml', output);
        process.exit(0);
    }
});
