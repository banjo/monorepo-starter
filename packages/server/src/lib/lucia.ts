import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Env } from "@pkg-name/common";
import { prisma, User } from "@pkg-name/db";
import { Lucia } from "lucia";

const adapter = new PrismaAdapter(prisma.session, prisma.user);
const env = Env.server();

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: env.NODE_ENV === "production",
        },
    },
    getUserAttributes: attributes => ({
        email: attributes.email,
        name: attributes.name,
        avatarUrl: attributes.avatarUrl,
    }),
});

type DatabaseUserAttributes = Pick<User, "name" | "email" | "avatarUrl">;

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        UserId: number;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}
