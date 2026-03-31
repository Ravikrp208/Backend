import express from 'express';
const app = express();
const port = 3000;
// Generics
class DataStore {
    data = [];
    add(item) {
        this.data.push(item);
    }
    getAll() {
        return this.data;
    }
    find(predicate) {
        return this.data.find(predicate);
    }
}
// Function with type inference and unions
function createUser(id, name, email, role = 'user') {
    const baseUser = { id, name, email, role };
    if (role === 'admin') {
        return {
            ...baseUser,
            permissions: ['read', 'write', 'delete']
        };
    }
    return baseUser;
}
// Narrowing with type guards
function isAdmin(user) {
    return 'permissions' in user;
}
// Express middleware
app.use(express.json());
// Routes demonstrating TypeScript features
app.get('/', (req, res) => {
    res.json({ message: 'TypeScript Express Server Running!' });
});
// Generic datastore usage
const userStore = new DataStore();
// Create some sample data
const user1 = createUser(1, 'John Doe', 'john@example.com', 'user');
const admin1 = createUser(2, 'Admin User', 'admin@example.com', 'admin');
userStore.add(user1);
userStore.add(admin1);
app.get('/users', (req, res) => {
    const users = userStore.getAll().map(user => {
        // Using utility type to exclude email
        const { email, ...userResponse } = user;
        return userResponse;
    });
    res.json(users);
});
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = userStore.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    // Narrowing example
    if (isAdmin(user)) {
        res.json({
            ...user,
            adminInfo: `Has ${user.permissions.length} permissions`
        });
    }
    else {
        res.json(user);
    }
});
// Error handling with proper typing
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
});
app.listen(port, () => {
    console.log(`TypeScript Express server running at http://localhost:${port}`);
    console.log('Features demonstrated:');
    console.log('- Core Types & Interfaces');
    console.log('- Union & Intersection Types');
    console.log('- Generics');
    console.log('- Type Guards & Narrowing');
    console.log('- Utility Types');
    console.log('- Express with TypeScript');
});
//# sourceMappingURL=index.js.map