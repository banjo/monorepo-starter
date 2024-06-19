import pino from "pino";
import { NodeContext } from "./node-context";
import { Env, createLogger } from "@pkg-name/common";
import { invariant } from "@banjoanton/utils";

const getNamespace = () => ({
    requestId: NodeContext.getRequestId(),
    userId: NodeContext.getUserId(),
});

type LogFn = (msg: string, ...args: unknown[]) => void;

type LogErrorWithErrorFn = (error: unknown, msg: string, ...args: unknown[]) => void;
type LogErrorWithStringFn = (msg: string, ...args: unknown[]) => void;

type LogErrorFn = LogErrorWithErrorFn & LogErrorWithStringFn;
interface ILogger {
    trace: LogFn;
    debug: LogFn;
    info: LogFn;
    warn: LogFn;
    error: LogErrorFn;
    fatal: LogErrorFn;
}

class ContextLogger implements ILogger {
    private logger: pino.Logger;

    constructor(name: string) {
        this.logger = createLogger(name);
    }

    public trace(msg: string, ...args: unknown[]): void {
        const namespace = getNamespace();
        this.logger.trace(
            {
                ...namespace,
                ...args,
            },
            msg
        );
    }

    public debug(msg: string, ...args: unknown[]): void {
        const namespace = getNamespace();
        this.logger.debug(
            {
                ...namespace,
                ...args,
            },
            msg
        );
    }

    public info(msg: string, ...args: unknown[]): void {
        const namespace = getNamespace();
        this.logger.info(
            {
                ...namespace,
                ...args,
            },
            msg
        );
    }

    public warn(msg: string, ...args: unknown[]): void {
        const namespace = getNamespace();
        this.logger.warn(
            {
                ...namespace,
                ...args,
            },
            msg
        );
    }

    public error(error: unknown, msg?: string, ...args: unknown[]): void;
    public error(msg: string, ...args: unknown[]): void;
    public error(errorOrMsg: unknown | string, ...args: unknown[]): void {
        const namespace = getNamespace();

        if (typeof errorOrMsg === "string") {
            this.logger.error({ ...namespace, ...args }, errorOrMsg);
            return;
        }

        const [msg, ...restArgs] = args;
        invariant(typeof msg === "string", "Expected message to be a string");
        this.logger.error({ err: errorOrMsg, ...namespace, ...restArgs }, msg);
    }

    public fatal(error: unknown, msg?: string, ...args: unknown[]): void;
    public fatal(msg: string, ...args: unknown[]): void;
    public fatal(errorOrMsg: unknown | string, ...args: unknown[]): void {
        const namespace = getNamespace();

        if (typeof errorOrMsg === "string") {
            this.logger.fatal({ ...namespace, ...args }, errorOrMsg);
        }

        const [msg, ...restArgs] = args;
        invariant(typeof msg === "string", "Expected message to be a string");
        this.logger.fatal({ err: errorOrMsg, ...namespace, ...restArgs }, msg);
    }
}

export const createContextLogger = (name: string): ILogger => new ContextLogger(name);

export const startupLog = (name: string, logger: ILogger) => {
    const env = Env.server();
    logger.info(`🚀 Starting up ${name}`);
    logger.info(`🖥️ Environment: ${env.NODE_ENV}`);
    logger.info(`📝 Log level: ${env.LOG_LEVEL}`);
    logger.info(`🚪 Port: ${env.PORT}`);
    logger.info(`🔗 Client URL: ${env.CLIENT_URL}`);
};
