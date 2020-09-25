function user(parent, args, context) {
    return context.prisma.post.findOne({ where: { id: parent.id } }).user()
}

function upvotes(parent, args, context) {
    return context.prisma.post.findOne({ where: { id: parent.id } }).upvotes()
}

function comments(parent, args, context) {
    return context.prisma.post.findOne({ where: { id: parent.id } }).comments()
}

function subreddit(parent, args, context) {
    return context.prisma.post.findOne({ where: { id: parent.id } }).subreddit()
}

module.exports = {
    user,
    upvotes,
    comments,
    subreddit
}