import Head from 'next/head'
import { useState } from 'react'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import SubredditList from '../components/SubredditList'
import Form from 'react-bootstrap/Form'

export default function Home() {

  const [searchQuery, updateSearchQuery] = useState("");

  const onChange = (event) => {
    updateSearchQuery(event.target.value.toLocaleLowerCase())
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingXl}>Subreddits</h2>
        <Form>
          <Form.Control
            size="lg"
            className="mr-sm-2 mb-4"
            type="text" placeholder="Search for any subreddit"
            onChange={onChange}
            value={searchQuery}
          />
        </Form>
        <SubredditList searchQuery={searchQuery} />
      </section>
    </Layout>
  )
}