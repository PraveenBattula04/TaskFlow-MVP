const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '../../db/tasks.json');

class FileController {
    // read tasks from the JSON file
    static async loadTasks() {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            throw err
        }
    }

    // Save tasks to the JSON file
    static async saveTasks(tasks) {
        try {
            await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
        } catch (err) {
            throw err
        }
    }
}

module.exports = FileController