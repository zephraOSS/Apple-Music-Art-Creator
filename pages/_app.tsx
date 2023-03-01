import Head from "next/head";

import "@/styles/fonts/SFPro.css";
import "@/styles/fonts/SFMono.css";
import "@/styles/fonts/SFCompact.css";

import "@/../styles/globals.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Apple Music Album Art Creator - zephra</title>
                <meta
                    name="description"
                    content="Create album or playlist art for Apple Music with ease."
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="icon" href="/favicon.ico" sizes="32x32" />
                <link rel="manifest" href="/static/manifest.json" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
