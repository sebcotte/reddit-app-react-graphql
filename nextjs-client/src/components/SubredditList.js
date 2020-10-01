import { gql, useMutation, useQuery } from '@apollo/client'
import ErrorMessage from './ErrorMessage'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { favSubredditsVar } from '../cache';

const FEED_QUERY = gql`
  query subreddits($filter: String, $skip: Int, $take: Int) {
    subreddits(filter: $filter, skip: $skip, take: $take, orderBy: { createdAt: desc}) {
        id
        name
        description
        count
    }
  }
`

const BOOKMARK_MUTATION = gql`
  mutation handleBookmarkSubreddit($subredditId: ID!, $addToBookmarks: Boolean!) {
    handleBookmarkSubreddit(subredditId: $subredditId, addToBookmarks: $addToBookmarks) {
        id
        name
    }
  }
`

export default function SubredditList({ searchQuery }) {
    const { loading: queryLoading, error: queryError, data } = useQuery(
        FEED_QUERY,
        {
            variables: {
                filter: searchQuery,
                skip: 0,
                take: 100,
            },
        }
    )

    // For the moment, there is a bug when using this mutation
    // TODO: To be fixed
    // const [bookmarkSubreddit] = useMutation(BOOKMARK_MUTATION)

    if (queryError) return <ErrorMessage message="Error loading subreddits." />
    if (queryLoading) return <div>Loading</div>

    /*const [bookmarkSubreddit, { error: bookmarkError }] = useMutation(BOOKMARK_MUTATION, {
        onCompleted({ subredditId }) {
            favSubredditsVar([...favSubredditsVar() , subredditId])
        }
    })

    const [unbookmarkSubreddit, { error: unbookmarkError }] = useMutation(UNBOOKMARK_MUTATION, {
        onCompleted({ subredditId }) {
            const bookmarks = [...favSubredditsVar()]
            bookmarks = bookmarks.splice(bookmarks.indexOf(subredditId))
            favSubredditsVar(bookmarks)
        }
    })*/

    const handleBookmark = (id, addToBookmarks) => {
        // Now use mutation to bookmark / unbookmark
        // bookmarkSubreddit({ variables: { subredditId: id, addToBookmarks: addToBookmarks } })
        console.log("Bookmark subreddit with id " + id + " ? " + addToBookmarks)
    }

    return (
        <>
            {data.subreddits.map(({ id, name, description }) => (
                <Card key={id} className="mb-2">
                    <Card.Body>
                        <Card.Title className="d-flex align-items-center justify-content-between">
                            <Link href={`/subreddits/${id}`}>
                                <a>{name}</a>
                            </Link>
                            <Button variant="outline" onClick={handleBookmark(id, true)}>
                                <BsHeart />
                            </Button>
                        </Card.Title>
                        <Card.Text>
                            {description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}

        </>
    )
}