const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
    // 1
    const password = await bcrypt.hash(args.password, 10)

    // 2
    const user = await context.prisma.user.create({ data: { ...args, password } })

    // 3
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    // 4
    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    // 1
    const user = await context.prisma.user.findOne({ where: { email: args.email } })
    if (!user) {
        throw new Error('No such user found')
    }

    // 2
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    // 3
    return {
        token,
        user,
    }
}

async function createSubreddit(parent, args, context, info) {
    const newSubreddit = context.prisma.subreddit.create({
        data: {
            name: args.name,
            description: args.description,
            count: 0,
        }
    })

    return newSubreddit
}


/*function post(parent, args, context, info) {
    const userId = getUserId(context);

    const newLink = context.prisma.link.create({
        data: {
            url: args.url,
            description: args.description,
            postedBy: { connect: { id: userId } },
        },
    })

    context.pubsub.publish("NEW_LINK", newLink)

    return newLink
}*/
async function bookmarkSubreddit(parent, args, context, info) {
    // Check if user that made current request is logged in
    const userId = getUserId(context)

    // Finally, save the given subreddit in bookmarks of user
    const newBookmarkedSubreddit = context.prisma.user.update({
        where: {
            id: userId
        },
        data: {
            favSubreddits: {
                connect: {
                    id: Number(args.subredditId)
                }
            }
        }
    })

    return context.prisma.subreddit.findOne({ where: { id: Number(args.subredditId) } })
}

async function unbookmarkSubreddit(parent, args, context, info) {
    // Check if user that made current request is logged in
    const userId = getUserId(context)

    // Chek if user has really bookmarked given subreddit
    /*const user = await context.prisma.user.findOne({ where: { id: userId }})
    const bookmarked = (user.favSubreddits && user.favSubreddits.find(subreddit => id === Number(args.subredditId))) ? true : false;
    console.log(user.favSubreddits)
    console.log("find ? " + user.favSubreddits.find(subreddit => id === Number(args.subredditId)))
    console.log("bookmarked" + bookmarked)
    if (!bookmarked) {
        throw new Error("Impossible to unbookmark because current subreddit isn't in your bookmark list")
    }*/

    // Finally, save the given subreddit in bookmarks of user
    const bookmarkedSubreddit = context.prisma.user.update({
        where: {
            id: userId
        },
        data: {
            favSubreddits: {
                disconnect: {
                    id: Number(args.subredditId)
                }
            }
        }
    })

    return context.prisma.subreddit.findOne({ where: { id: Number(args.subredditId) } })
}

async function handleBookmarkSubreddit(parent, args, context, info) {
    // Check if user that made current request is logged in
    const userId = getUserId(context)

    // Finally, save the given subreddit in bookmarks of user
    if (Boolean(args.addToBookmarks)) {
        context.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                favSubreddits: {
                    connect: {
                        id: Number(args.subredditId)
                    }
                }
            }
        })
    } else {
        context.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                favSubreddits: {
                    disconnect: {
                        id: Number(args.subredditId)
                    }
                }
            }
        })
    }

    return context.prisma.subreddit.findOne({ where: { id: Number(args.subredditId) } })
}

async function createPost(parent, args, context, info) {
    // Check if user that made current request is logged in
    const userId = getUserId(context)

    const post = context.prisma.post.create({
        data: {
            title: args.title,
            content: args.content,
            user: { connect: { id: userId }},
            subreddit: { connect: { id: Number(args.subredditId) }},
        }
    })

    return post
}

async function upvote(parent, args, context, info) {
    // Check if user that made current request is logged in
    const userId = getUserId(context)

    // Check if user already voted current post
    const vote = await context.prisma.upvote.findOne({
        where: {
            postId_userId: {
                postId: Number(args.postId),
                userId: userId
            }
        }
    })

    if (Boolean(vote)) {
        throw new Error(`Already voted for link: ${args.postId}`)
    }

    // Finally, create an upvote for current user
    const newUpvote = context.prisma.upvote.create({
        data: {
            user: { connect: { id: userId } },
            post: { connect: { id: Number(args.postId) } },
        }
    })
    context.pubsub.publish("NEW_VOTE", newUpvote)

    return newUpvote
}

module.exports = {
    signup,
    login,
    upvote,
    createSubreddit,
    bookmarkSubreddit,
    unbookmarkSubreddit,
    createPost,
    handleBookmarkSubreddit,
}