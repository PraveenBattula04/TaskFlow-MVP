const mongoose = require('mongoose');
const fs = require('fs')
const path = require('path');
const basename = path.basename(__filename); 
const db = {}
db['sync'] = () => {
    try {
        console.log('db connected successfully')
        return mongoose.connect(process.env.mongoUrl);
    } catch (err) {
        console.log(err)
    }
}
fs.readdirSync(__dirname)
.filter(file => {
    // filter only js files, exclude self file and directories
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
})
.forEach(file => {
    const modelName = file.slice(0 , -3)
    // console.log(path.join(__dirname, file))
    db[modelName] = require('./' + modelName)
})

module.exports = db