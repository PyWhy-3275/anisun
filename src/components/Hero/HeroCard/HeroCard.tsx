import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";
import {useDebouncedValue, useInViewport} from "@mantine/hooks";
import {
    Badge,
    Box,
    Container,
    Group,
    Image,
    Overlay,
    Stack,
    Title,
    Transition
} from "@mantine/core";
import classes from './HeroCard.module.css';
import {variables} from "@/configs/variables";
import NextImage from "next/image";
import {useMemo} from "react";
import {TransitionStylesType} from "@/types/Transition/TransitionStyles.type";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import useCustomTheme from "@/hooks/useCustomTheme";

const TRANSITION_PROPS: TransitionStylesType = {
    transition: "fade-left",
    duration: 1000,
    timingFunction: "ease",
}

export default function HeroCard({
    animeTitle,
    debouncedHeight
}: {
    animeTitle?: AnimeType,
    debouncedHeight: number
}) {
    const { ref, inViewport } = useInViewport();
    const [debouncedInViewport] = useDebouncedValue(inViewport, 100);
    const [debouncedSlightlyInViewport] = useDebouncedValue(inViewport, 250);
    const [debouncedLongerInViewport] = useDebouncedValue(inViewport, 400);
    const { theme } = useCustomTheme()
    const width = (debouncedHeight) / 0.42

    const heroCard = useMemo(
        () => (
            <Container
                w={width}
                maw={2160}
                style={{
                    height: debouncedHeight
                }}
                className={classes.wrapper}
            >
                <Box
                    style={{
                        height: debouncedHeight
                    }}
                    className={classes.centerBox}
                    ref={ref}
                />
                <Image
                    className={classes.poster}
                    style={{
                        scale: debouncedInViewport ? 1 : 1.2,
                    }}
                    alt="Anime poster"
                    component={NextImage}
                    src={animeTitle?.poster?.originalUrl}
                    placeholder="blur"
                    blurDataURL={variables.imagePlaceholder}
                    fill
                />
                <Overlay
                    backgroundOpacity={debouncedInViewport ? 0.5 : 0.8}
                    blur={debouncedInViewport ? 0 : 2}
                    className={classes.overlay}
                >
                    <Container
                        fluid
                    >
                        <Stack
                            w="fit-content"
                            align="flex-start"
                            justify="flex-start"
                        >
                            <Transition
                                mounted={debouncedInViewport}
                                {...TRANSITION_PROPS}
                            >
                                {
                                    (styles) => (
                                        <Title className={classes.title} style={styles}>
                                            {animeTitle?.name}
                                        </Title>
                                    )
                                }
                            </Transition>
                            <Transition
                                mounted={debouncedSlightlyInViewport}
                                {...TRANSITION_PROPS}
                            >
                                {
                                    (styles) => (
                                        <Group style={styles}>
                                            <Badge
                                                autoContrast
                                                color={theme.color}
                                            >
                                                {animeTitle?.score}
                                            </Badge>
                                            {
                                                animeTitle?.genres.map((genre, index) => {
                                                    if (index >= 3) {
                                                        return
                                                    }

                                                    return (
                                                        <Badge
                                                            variant="light"
                                                            color="white"
                                                            key={
                                                                `${animeTitle?.id}_${genre.name}`
                                                            }
                                                        >
                                                            {genre.russian}
                                                        </Badge>
                                                    )
                                                })
                                            }
                                        </Group>
                                    )
                                }
                            </Transition>
                            <Transition
                                mounted={debouncedLongerInViewport}
                                {...TRANSITION_PROPS}
                            >
                                {
                                    (styles) => (
                                        <DecoratedButton
                                            radius="md"
                                            style={styles}
                                        >
                                            Перейти
                                        </DecoratedButton>
                                    )
                                }
                            </Transition>
                        </Stack>
                    </Container>
                </Overlay>
            </Container>
        ),
        [
            debouncedHeight,
            ref,
            animeTitle?.poster?.originalUrl,
            animeTitle?.name,
            animeTitle?.score,
            animeTitle?.genres,
            animeTitle?.id,
            debouncedInViewport,
            debouncedSlightlyInViewport,
            debouncedLongerInViewport,
            theme.color
        ]
    )

    return (
        <>
            {heroCard}
        </>
    )
}