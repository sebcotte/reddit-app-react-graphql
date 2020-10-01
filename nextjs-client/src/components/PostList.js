import ErrorMessage from './ErrorMessage'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link';
import Card from 'react-bootstrap/Card'

export default function PostList({ subreddit }) {
    const subredditPosts = subreddit.posts ? subreddit.posts : []

    return (    
        <>
            {subredditPosts.map(({ id, title, content }) => (
                <Card key={id} className="mb-2">
                    <Card.Body>
                        <Card.Title>
                            <Link href={`/subreddits/${subreddit.id}/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            {content}
                        </Card.Text>
                    </Card.Body>
                </Card>  
            ))}
        </>
    )
}