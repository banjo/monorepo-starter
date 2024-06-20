import { Result } from "@banjoanton/utils";
import { createContextLogger } from "../lib/context-logger";
import { UserRepository } from "../repositories/user-repository";

const logger = createContextLogger("user-service");

type CreateUserProps = {
    externalId: string;
    email: string;
    name: string;
};

const createUser = async (props: CreateUserProps) => {
    const { externalId, email } = props;
    logger.info(`Creating user with externalId: ${externalId} and email: ${email}`);

    const res = await UserRepository.createUser(props);

    if (!res.success) {
        logger.error({ externalId, email }, `Could not create user`);
        return Result.error(
            `Could not create user with externalId: ${externalId} and email: ${email}`,
            "InternalError"
        );
    }

    logger.info({ externalId, email }, `Created user `);

    return Result.ok(res.data);
};

export const UserService = { createUser };
