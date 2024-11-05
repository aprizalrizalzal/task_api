module.exports = {
    "up": `CREATE TABLE tasks (
                id CHAR(36) PRIMARY KEY, 
                title VARCHAR(50) NOT NULL, 
                description TEXT, 
                due_date TIMESTAMP, 
                status ENUM('in progress', 'pending', 'complete'),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`,
    "down": "DROP TABLE tasks"
}