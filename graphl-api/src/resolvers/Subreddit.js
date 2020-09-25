function posts(parent, args, context) {
    return context.prisma.subreddit.findOne({ where: { id: parent.id } }).posts()
}

function bookmarkedBy(parent, args, context) {
    return context.prisma.subreddit.findOne({ where: { id: parent.id } }).bookmarkedBy()
}

module.exports = {
    posts,
    bookmarkedBy
}