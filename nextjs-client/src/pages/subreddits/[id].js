import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import { gql } from '@apollo/client'
import apolloClient from '../../lib/apolloClient';
import { useRouter } from 'next/router';
import Error from 'next/error';
import PostList from '../../components/PostList'

const SUBREDDIT_QUERY = gql`
    query subreddit($id: ID!) {
        subreddit(id: $id) {
            id
            name
            description
            posts {
                id
                title
                content
                user {
                    name
                }
                comments {
                    id
                    content
                }
            }
            bookmarkedBy {
                name
            }
        }
    }
`

// Here subreddit is contained in props of the current React page
export default function Subreddit({ subreddit }) {
    
    const { isFallback } = useRouter()

    if (!isFallback && !subreddit) {
        return <Error statusCode={404} title="This subreddit could not be found" />
    }

    return (
        <Layout>
            <Head>
                <title>{subreddit.name}</title>
            </Head>
            <h1 className={utilStyles.headingXl}>{subreddit.name}</h1>
            {subreddit.description}

            <h1 className={utilStyles.headingLg}>Posts</h1>
            <PostList subreddit={subreddit} />
        </Layout>
    )
}

/*
export async function getStaticPaths() {
    // Return a list of possible value for id
    const { error, data } = await apolloClient.query({
        query: SUBREDDITS_IDS_QUERY,
        variables: { take: 10 }
    })

    const subreddits = data

    console.log(subreddits)

    // Retrieve all subreddits
    // Get the paths we want to pre-render based on posts
    const paths = subreddits.map((subreddit) => ({
        params: { id: subreddit.id },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
    //return { paths: [], fallback: true };

}*/

export async function getServerSideProps(context) {
    // Fetch necessary data for the blog post using params.id
    const { data } = await apolloClient.query({
        query: SUBREDDIT_QUERY,
        variables: { id: context.params.id }
    })

    return {
        props: {
            // subreddit: data
            subreddit: data.subreddit
        }, // will be passed to the page component as props
    }
}

/*export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const { data } = await apolloClient.query({
        query: SUBREDDIT_QUERY,
        variables: { id: params.id }
    })

    return {
        props: {
            subreddit: data
        }
    }
}*/
