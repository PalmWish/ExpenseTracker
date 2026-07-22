import swaaggerJsdoc from "swagger-jsdoc";

const option = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Expense Tracker API",
            version: "1.0.0",
            description: "Expense Tracker Backend API"
        },
        components: {
    securitySchemes: {
        bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
        },
    },
},
security: [
    {
        bearerAuth: [],
    },
],
        server: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./src/routes/*.ts"]
}

const swaaggerSpec = swaaggerJsdoc(option)

export default swaaggerSpec;