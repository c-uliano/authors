const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        minlength: [3, "Name must be at least 3 characters long."]
    },
    book: {
        type: String,
        required: [true, "Book title is required."],
        minlength: [3, "Favorite book title must be at least 3 characters long."]
    }
}, { timestamps: true });

// const Rename = mongoose.model("Rename", schema);
// module.exports = Rename;
// OR
module.exports = mongoose.model("Author", schema);
