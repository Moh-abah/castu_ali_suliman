// src/app/page.js
"use client";

import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero/Hero';
import About from '../components/home/About/About';
import Skills from '../components/home/Skills/Skills';
import Projects from '../components/home/Projects/Projects';
import Contact from '../components/home/Contact/Contact';

export default function Home() {
  return (
    <>
      <Head>
        <title>مصمم جرافيك محترف | أعمالي الإبداعية</title>
        <meta name="description" content="تصميمات جرافيك إبداعية ومبتكرة لجميع احتياجاتك البصرية" />
        <meta name="keywords" content="تصميم جرافيك, هوية بصرية, تصميم شعارات, بروشورات, فوتوشوب, إليستريتور" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </Layout>
    </>
  );
}
