import Head from 'next/head';
import Hero from 'common/components/Home/Hero';
import How from 'common/components/Home/How';
import Services from 'common/components/Home/Services';
import We from 'common/components/Home/We';
import Contacts from 'common/components/Home/Contacts';
import About from 'common/components/Home/About';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Post } from 'common/types/blog';
import { getPosts } from './api/posts';
import Blog from 'common/components/Home/Blog';
import Text from 'common/components/Home/Text';

export const getServerSideProps: GetServerSideProps<{ posts: Post[] }> = async () => {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
};

export default function Home({ posts }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <>
      <Head>
        <title>Úkon.sk</title>
        <meta name="description" content="Úkon.sk - home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Hero />
        <How />
        <Services />
        <We />
        <Contacts />
        <About />
        <Blog posts={posts} />
        <Text />
      </main>
    </>
  );
};
