"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://www.fastify.io/docs/latest/Reference/TypeScript/
const fastify_1 = __importDefault(require("fastify"));
const server = (0, fastify_1.default)();
server.get('/api/permission-route3', async () => {
    return 'You have permission for route 3';
});
server.listen({ port: 5005 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
