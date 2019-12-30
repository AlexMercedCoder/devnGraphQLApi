const user = async(parent, args, context, info) => {
    log(args.username);
    Users.find({username: args.username});
    return results;
}

const blog = async(User) => {
    log(User);
    return Blogs.find({user: User.username});
}


const todos = async(User) => {
    log(User);
    return knex.select('entry').from('todoes').where({user: User.username})
}
