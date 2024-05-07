"use client"

import classes from './NewestAnimes.module.css';
import {Carousel} from "@mantine/carousel";
import {useQuery} from "@tanstack/react-query";
import {Title} from "@mantine/core";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {client} from "@/lib/shikimori/client";
import {StatusType} from "@/types/Shikimori/Responses/Types/StatusType";
import AutoScroll from "embla-carousel-auto-scroll";
import CarouselSlides from "@/components/HeroContent/CarouselSlides/CarouselSlides";

export function NewestAnimes() {
    const autoplay
        = useRef(
        AutoScroll({
            speed: 2,
            direction: "backward",
            playOnInit: false,
        })
    );
    const shikimori = client()
    const currentYear = new Date().getFullYear().toString()
    const [year, setYear] = useState(currentYear)
    const [animeStatus, setAnimeStatus]: [animeStatus: StatusType | undefined, Dispatch<SetStateAction<StatusType | undefined>>] = useState<StatusType | undefined>("ongoing")

    const { data, status, error } = useQuery({
        queryKey: ['hero', 'newest', year],
        queryFn: getNewestTitles,
    });

    async function getNewestTitles() {
        return await shikimori.animes.list({
            limit: 15,
            status: animeStatus,
            year: year,
            order: "created_at"
        })
    }

    const carouselSlides = Array.from({ length: 15 })

    if (status === 'success' && data.animes.length < 15) {
        const previousYear = (new Date().getFullYear() - 1).toString()
        setYear(previousYear)
        setAnimeStatus("released")
    }

    useEffect(() => {
        if (data?.animes.length !== 15) {
            return
        }

        autoplay.current.play()
    }, [data]);

    return (
        <div className={classes.hero}>
            <Title>Новинки</Title>
            <Carousel
                classNames={{
                    control: classes.control
                }}
                slideSize={225}
                height={325}
                slideGap="md"
                controlsOffset="md"
                controlSize={40}
                loop
                dragFree
                plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.play}
            >
                <CarouselSlides carouselSlides={carouselSlides} error={error} status={status} data={data} />
            </Carousel>
        </div>
    );
}