'use client';

import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import {useQuery} from "@tanstack/react-query";
import {anilibria} from "@/lib/anilibria/anilibria";
import React from "react";
import {Skeleton} from "@mantine/core";

interface ResponseProps {
    names: {
        ru: string;
    }
    player: {
        host: string;
        list: {
            episode: string;
            hls: {
                fhd?: string;
                hd?: string;
                sd?: string;
            }
        }[]
    },
}

export default function VideoEmbed({ code }: { code: string }) {
    const { isFetching, data } = useQuery({
        queryKey: ['anime', code],
        queryFn: async () => fetchAnime(code),
    });

    async function fetchAnime(code: string) {
        const response: ResponseProps = await anilibria.title.code(code)
        return response
    }

    if (!data) {
        return (
            <Skeleton visible={isFetching} height="56.25vw" width="100vw" />
        )
    }

    const title = data.names.ru
    const player = data.player;
    const preview = "https://anilibria.tv/storage/releases/episodes/previews/9542/1/DMzcnlKyg89dRv5f__86bf22cbc0faac3d42cc7b87ea8c712f.jpg"

    // Некоторые аниме тайтлы не имеют плеера
    if (Object.keys(player.list).length === 0) {
        return (
            <>
                <div>{code}</div>
                <div>К сожалению, онлайн-плеер для данного аниме недоступен.</div>
            </>
        );
    }

    return (
        <>
            <iframe
                src="//aniqit.com/serial/58183/c2e6168a788b1c673508a967dca7837a/720p"
                width="610"
                height="370"
                allow="autoplay *; fullscreen *"
            />
            <VideoPlayer
                title={title}
                player={player}
                preview={preview}
            />
        </>
    );
}