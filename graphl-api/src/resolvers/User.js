function posts(parent, args, context) {
    return context.prisma.user.findOne({ where: { id: parent.id } }).posts()
}

function favSubreddits(parent, args, context) {
    return context.prisma.user.findOne({ where: { id: parent.id } }).favSubreddits()
}

function comments(parent, args, context) {
    return context.prisma.user.findOne({ where: { id: parent.id } }).comments()
}

function replies(parent, args, context) {
    return context.prisma.user.findOne({ where: { id: parent.id } }).replies()
}

module.exports = {
    posts,
    favSubreddits,
    comments,
    replies
}