function user(parent, args, context) {
    return context.prisma.comment.findOne({ where: { id: parent.id } }).user()
}

function post(parent, args, context) {
    return context.prisma.comment.findOne({ where: { id: parent.id } }).post()
}

function replies(parent, args, context) {
    return context.prisma.comment.finaOne({ where: { id: parent.id } }).replies()
}

module.exports = {
    user,
    post,
    replies
}