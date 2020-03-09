const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubMenus = new Schema({
    name: { type: String },
    sblink: { type: String },
    status: { type: String }
});

const rolConfigSchema = new Schema({
    name: { type: String },
    typeRol: { type: String },
    menulink: { type: String },
    relmenu: { type: String },
    submenu: [SubMenus],
    status: { type: String }
});

module.exports = mongoose.model('RolConfig', rolConfigSchema);