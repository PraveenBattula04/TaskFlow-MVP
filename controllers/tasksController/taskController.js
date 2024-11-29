const { v4: uuidv4 } = require('uuid');
const FileController = require('../jsonFileController/fileController')

class TasksController {
    static async createTask(data) {
        try {
            const { title, description } = data
            const tasks = await FileController.loadTasks();
            const newTask = {
                id: uuidv4(),
                title,
                description,
                status: 'pending'
            };
            await tasks.push(newTask);
            await FileController.saveTasks(tasks);
            return newTask
        } catch (error) {
            throw error
        }
    }

    static async getTasks() {
        try {
            const tasks = await FileController.loadTasks();
            return tasks
        } catch(err) {
            throw err
        }
    }

    static async updateTask(data) {
        try {
            const { status, id } = data
            const tasks = await FileController.loadTasks();
            const index = tasks.findIndex(task => task.id === id);
            if (index === -1) {
                throw new Error('TASK_NOT_FOUND')
            }
            tasks[index].status = status
            await FileController.saveTasks(tasks);
            return tasks[index]
        } catch(err) {
            throw err
        }
    }

    static async deleteTask(data) {
        try {
            const { id } = data
            const tasks = await FileController.loadTasks();
            const filteredTasks = await tasks.filter(e => e.id !== id)
            if(tasks.length && (tasks.length === filteredTasks?.length)) {
                throw new Error('TASK_NOT_FOUND')
            }
            await FileController.saveTasks(filteredTasks);
            return 'Task deleted successfully'
        } catch(err) {
            throw err
        }
    }

    static async filterTasks(data) {
        try {
            const { status } = data
            let tasks = await FileController.loadTasks();
            tasks = await tasks.filter(e => e.status === status)
            return tasks
        } catch(err) {
            throw err
        }
    }
}

module.exports = TasksController
