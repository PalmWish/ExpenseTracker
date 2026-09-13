"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
};
const swaaggerSpec = (0, swagger_jsdoc_1.default)(option);
exports.default = swaaggerSpec;
//# sourceMappingURL=swagger.js.map