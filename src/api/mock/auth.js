import { MockDB, STORAGE_KEYS } from './db';
import { v4 as uuidv4 } from 'uuid';

export const mockAuth = {
    login: async (email, password) => {
        await new Promise(r => setTimeout(r, 600));

        const users = MockDB.get(STORAGE_KEYS.USERS) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: `mock-jwt-${user.id}`,
            role: user.role
        };
    },

    signup: async (name, email, password) => {
        await new Promise(r => setTimeout(r, 800));

        const users = MockDB.get(STORAGE_KEYS.USERS) || [];
        if (users.find(u => u.email === email)) {
            throw new Error('User already exists');
        }

        const newUser = {
            id: uuidv4(),
            name,
            email,
            password,
            role: 'user',
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        MockDB.set(STORAGE_KEYS.USERS, users);

        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token: `mock-jwt-${newUser.id}`,
            role: 'user'
        };
    },

    getAllUsers: async () => {
        return MockDB.get(STORAGE_KEYS.USERS) || [];
    }
};
