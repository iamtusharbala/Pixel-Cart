const mongoose = require('mongoose')

const connectDB = () => {
    try {
        mongoose.connect('mongodb://localhost:27017/pixel-cart')
            .then(() => console.log('Connected to DB successully'))
            .catch((e) => console.log(`Error in connecting`, e))
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDB