const mongoose = require('mongoose');
const { Schema } = mongoose;


const courseSchema = new Schema({
    title: { type: String },
    department_id: { type: String },
    description: { type: String },
    requirements: { type: String },
    owner_id: { type: Number },
    profile: { type: String },
    status: { type: Boolean },
    user_id: { type:  Number },
    created: { type: Date },
    valid_days: { type: Number },
    valid_month: { type: Number },
    valid_years: { type: Number },
    online: { type: Boolean },
    url_src: { type: String },
    url_video: { type: String },
    dateini: { type: String },
    dateclose: { type: String },
    category_id: { type: String },
    teacher_id: { type: String },
    contact: { type: String },
    course_time: { type: String }
});

module.exports = mongoose.model('Course', courseSchema);