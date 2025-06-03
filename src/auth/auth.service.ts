import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TUserInsert, TUserSelect, userTable } from "../drizzle/schema";

// Register a new user
export const createUserServices = async (user: TUserInsert): Promise<TUserSelect> => {
    const [newUser] = await db.insert(userTable).values(user).returning();
    return newUser;
};

// Get user by email
export const getUserByEmailIdServices = async (email: string): Promise<TUserSelect | undefined> => {
    return await db.query.userTable.findFirst({
        where: eq(userTable.email, email),
    });
};

// Save reset token and expiry for a user
export const saveResetTokenService = async (
    userId: number,
    token: string | null,
    expiry: Date | null
): Promise<void> => {
    await db.update(userTable)
        .set({
            resetToken: token,
            resetTokenExpiry: expiry,
        })
        .where(eq(userTable.userId, userId));
};

// Get user by reset token
export const getUserByResetTokenService = async (token: string): Promise<TUserSelect | undefined> => {
    return await db.query.userTable.findFirst({
        where: eq(userTable.resetToken, token),
    });
};

// Reset user password
export const resetUserPasswordService = async (
    userId: number,
    hashedPassword: string
): Promise<void> => {
    await db.update(userTable)
        .set({
            password: hashedPassword,
        })
        .where(eq(userTable.userId, userId));
};
