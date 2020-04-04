import React from 'react';
import App from 'next/app';
import * as Sentry from '@sentry/browser';
import Router from 'next/router'
import * as gtag from '../lib/gtag'

Sentry.init({
    dsn: 'https://8ccc5d5336f344ffbb2025d3f3447e00@sentry.io/1470963'
});

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return {pageProps};
    }

    componentDidCatch(error, errorInfo) {
        Sentry.withScope((scope) => {
            Object.keys(errorInfo).forEach((key) => {
                scope.setExtra(key, errorInfo[key]);
            });

            Sentry.captureException(error);
        });

        super.componentDidCatch(error, errorInfo);
    }

    render() {
        const {Component, pageProps} = this.props;

        return <Component {...pageProps} />
    }
}

export default MyApp;