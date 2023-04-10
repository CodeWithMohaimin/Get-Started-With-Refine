import React from "react";
import { AppProps } from "next/app";
import type { NextPage } from "next";
import { Refine, GitHubBanner, } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, { UnsavedChangesNotifier } from "@refinedev/nextjs-router";

import { DataProvider } from "@refinedev/strapi-v4";
import { authProvider, axiosInstance } from "src/authProvider";
import { API_URL } from "src/constants";
import { Layout } from "@components/layout";
import { Header } from "@components/header";




export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
     noLayout?: boolean;
 };

 type AppPropsWithLayout = AppProps & {
     Component: NextPageWithLayout;
 };

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
    const renderComponent = () => {
        if (Component.noLayout) {
            return <Component {...pageProps} />;
        }

            return (
                <Component {...pageProps} />
            );
    };

    
    
    return (
        <>
        <GitHubBanner />
        <RefineKbarProvider>
            
            <Refine 
                routerProvider={routerProvider}
                authProvider={authProvider}
dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
                resources={[
                    {
                        name: "blog-posts",
                        list: "/blog-posts",
                        create: "/blog-posts/create",
                        edit: "/blog-posts/edit/:id",
                        show: "/blog-posts/show/:id",
                        meta: {
                            canDelete: true,
                        },
                    },
                    {
                        name: "categories",
                        list: "/categories",
                        create: "/categories/create",
                        edit: "/categories/edit/:id",
                        show: "/categories/show/:id",
                        meta: {
                            canDelete: true,
                        },
                    }
                ]}
                options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                }}
            >
                {renderComponent()}
                <RefineKbar />
                <UnsavedChangesNotifier />
            </Refine>
            
        </RefineKbarProvider>
        </>
      );
};


export default MyApp;
