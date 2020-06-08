var controllers = require("./../controllers");
const User = require("../models/Tree");
module.exports = function (app) {
    app.post('/api/',controllers.tree.createRoot);
    app.get('/api/',controllers.tree.displayTree)
    app.get('/api/descendants/',controllers.tree.descendants)
}
