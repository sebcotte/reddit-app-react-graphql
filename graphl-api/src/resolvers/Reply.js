function user(parent, args, context) {
    return context.prisma.reply.findOne({ where: { id: parent.id } }).user()
}

function comment(parent, args, context) {
    return context.prisma.reply.findOne({ where: { id: parent.id } }).comment()
}

module.exports = {
    user,
    comment
}