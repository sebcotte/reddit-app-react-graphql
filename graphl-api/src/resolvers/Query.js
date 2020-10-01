// Returns an array of subreddits
async function subreddits(parent, args, context, info) {
  const where = args.filter
    ? {
      OR: [
        { description: { contains: args.filter } },
        { name: { contains: args.filter } },
      ],
    }
    : {}

  const subreddits = await context.prisma.subreddit.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  })


  return subreddits
  /*
  const count = await context.prisma.subreddit.count({ where })
  return {
      subreddits,
      count,
  }*/
}

async function subreddit(parent, args, context, info) {
  return await context.prisma.subreddit.findOne({ where: { id: Number(args.id) }})
}

async function comments(parents, args, context, info) {
  return await context.prisma.comment.findMany(
    { where: { post: { id: { equals: Number(args.postId)} }}}
  )
}

module.exports = {
    subreddits,
    subreddit,
    comments
}