import uuid4 from 'uuid4';
import { KnownError } from '../errors';
import { Token, UserSchema } from '../models';
import { UserRepo, TokenRepo } from '../repositories'
import { validateModel } from '../models';
import bcrypt from 'bcrypt'

// 7 days
const ACCESS_TOKEN_TTL = 1000 * 60 * 60 * 24 * 7

export const UserService = {
    async login(email: string, password: string): Promise<Token> {
        const user = await UserRepo.findByEmail(email)

        if (user == null) {
            throw new KnownError({
                message: 'Invalid email or password',
                code: 401,
                name: 'Unauthorized',
            });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            throw new KnownError({
                message: 'Invalid email or password',
                code: 401,
                name: 'Unauthorized',
            });
        }

        const result = validateModel(user, UserSchema)

        if (!result.ok) throw new Error(
            `Invalid user data: ${result.error.message} for user ID: ${user.id}`
        );

        const now = new Date()
        const expiresAt = new Date(now.getTime() + ACCESS_TOKEN_TTL)

        const jwt = await TokenRepo.create({
            id: uuid4(),
            userId: user.id,
            createdAt: new Date,
            expiresAt: expiresAt,
            type: "access",
        })

        // TODO revoke user's previous tokens

        return jwt
    },

    async register(email: string, password: string, name: string): Promise<void> {
        const existingUser = await UserRepo.findByEmail(email)

        if (existingUser != null) {
            throw new KnownError({
                message: 'User with this email already exists',
                code: 400,
                name: 'ValidationError',
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 10)

        const user = await UserRepo.create({
            id: uuid4(),
            email: email,
            emailVerified: false,
            password: hashedPassword,
            name: name,
            type: 'user',
            createdAt: new Date(),
        })

        const result = validateModel(user, UserSchema)

        if (!result.ok) throw new Error(
            `Invalid user data: ${result.error.message} for user ID: ${user.id}`
        );
    }
}