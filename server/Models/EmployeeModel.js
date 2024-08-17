const mongoose = require("mongoose");
// const schema = mongoose.schema;
const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});
const EmployeeModel = mongoose.model('employees',EmployeeSchema);
module.exports = EmployeeModel;