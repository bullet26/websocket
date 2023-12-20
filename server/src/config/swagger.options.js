const options = dirname => {
    return {
        swaggerDefinition: {
            info: {
                description: 'This service defines the main user`s functions',
                title: 'Main service',
                version: '1.0.0',
            },
            host: 'localhost:8080',
            basePath: '/',
            produces: ['application/json', 'application/xml'],
            schemes: ['http', 'https'],
            securityDefinitions: {
                JWT: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: 'bearer-jwt  (http, Bearer)',
                },
            },
            externalDocs: {
                description: 'Link to external documentation',
                url: 'http://localhost:8080/api-docs',
            },
        },
        route: {
            url: '/docs/swagger2',
            docs: '/swagger.json',
        },
        basedir: `${dirname}/src`,
        files: ['./users/*.js'],
    };
};

export default options;
