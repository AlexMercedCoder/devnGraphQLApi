const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
	title:  String,
	entry: String,
	tech: String,
	Date: {type: Date, default: Date.now},
	user: String
},
{timestamps: true});

//Creating an Article class -- will be stored in 'articles' collection.  Mongo does this for you automatically
const Blogs = mongoose.model('Blogs', BlogSchema);

module.exports = Blogs;
