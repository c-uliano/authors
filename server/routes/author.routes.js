const AuthorController = require('../controllers/author.controller');

module.exports = app => {
    app.get('/api/author', AuthorController.findAll);

    app.get('/api/author/:id', AuthorController.findOne);

    app.post('/api/author', AuthorController.createOne);

    // * changes all values in the database to match the request body
    // app.put('/api/RENAME/:id', AuthorController.updateOne);

    // * changes only the values in the request body
    app.patch('/api/author/:id', AuthorController.updateOne);

    app.delete('/api/author/:id', AuthorController.deleteOne);
};