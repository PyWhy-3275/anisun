import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import {ColorSchemeScript, MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import NextTopLoader from "nextjs-toploader";
import TanstackQueryProviders from "@/utils/TanstackQueryProvider";
import {Notifications} from "@mantine/notifications";
import '@mantine/notifications/styles.css';
import {ClerkProvider} from "@clerk/nextjs";
import {ruRU} from "@clerk/localizations";
import MobileModal from "@/components/MobileModal/MobileModal";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Animeth",
    description: "Anime player on NextJS with Tanstack Query, Drizzle ORM, NeonDB, Mantine UI kit and Shikimori, Anilibria APIs",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider localization={ruRU}>
            <html lang="en">
                <head>
                    <ColorSchemeScript/>
                </head>
                <body className={inter.className}>
                    <NextTopLoader
                      color="#0076ff"
                      showSpinner={false}
                      height={4}
                    />
                    <TanstackQueryProviders>
                        <MantineProvider defaultColorScheme="dark">
                            <Notifications zIndex={30000} limit={3} />
                            {children}
                            <MobileModal />
                            <Footer />
                        </MantineProvider>
                    </TanstackQueryProviders>
                </body>
            </html>
        </ClerkProvider>
    );
}
