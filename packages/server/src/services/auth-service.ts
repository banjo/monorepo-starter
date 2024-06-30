import { createContextLogger } from "../lib/context-logger";

const logger = createContextLogger("auth-service");

const doSomething = () => logger.info("example");

export const AuthService = { doSomething };
