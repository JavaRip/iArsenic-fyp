import { Repository } from './repo.interface';
import { User, UserSchema } from '../models/user.model';
import db from '../db';

export default class UserRepo implements Repository<User> {
    async findById(id: string): Promise<User | null> {
        const doc = await db.collection('user').doc(id).get();

        if (!doc.exists) {
            return null;
        }

        const user = UserSchema.parse(doc.data());
        return user;
    }

    async findAll(): Promise<User[]> {
        const snapshot = await db.collection('user').get();
        const users: User[] = [];

        snapshot.forEach((doc) => {
            const user = UserSchema.parse(doc.data());
            users.push(user);
        });

        return users;
    }

    async create(user: User): Promise<User> {
        const docRef = await db.collection('user').add(user);
        const createdDoc = await docRef.get();

        const createdUser = UserSchema.parse(createdDoc.data());
        return createdUser;
    }

    async update(user: User): Promise<User> {
        await db.collection('user').doc(user.id).set(user, { merge: true });
        return user;
    }

    async delete(id: string): Promise<void> {
        await db.collection('user').doc(id).delete();
    }
}