module.exports = {
    "up": `CREATE TABLE tasks (
                id CHAR(36) PRIMARY KEY, 
                title VARCHAR(50) NOT NULL, 
                description TEXT, 
                due_date DATE, 
                status ENUM('in progress', 'pending', 'complete')
            )`,
    "down": "DROP TABLE tasks"
}