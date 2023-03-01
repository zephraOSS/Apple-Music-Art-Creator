import { cloudinary, AdvancedImage } from "@/lib/cloudinary";

import { useEffect, useRef, useState } from "react";
import { toJpeg, toPng } from "html-to-image";

import useDownloader from "react-use-downloader";

import dynamic from "next/dynamic";

import styles from "@/styles/Home.module.css";

export default function Home() {
    const [config, setConfig] = useState({
            appleLogo: {
                type: "checkbox",
                name: "Show Apple Logo",
                value: true,
                color: "#ffffff"
            },
            bigTitle: {
                type: "text",
                name: "Big Title",
                value: "Big Title",
                color: "#ffffff"
            },
            subTitle: {
                type: "text",
                name: "Sub Title",
                value: "Sub Title",
                color: "#ffffff"
            },
            subText: {
                type: "text",
                name: "Sub Text",
                value: "Sub Text",
                color: "#ffffff"
            }
        }),
        [backgroundURL, setBackgroundURL] = useState<string | null>(
            `https://raw.githubusercontent.com/0neGal/albumArtCreator/main/src/backgrounds/${
                Math.floor(Math.random() * 18) + 1
            }.png`
        ),
        [backgroundModal, setBackgroundModal] =
            useState<React.ComponentType<{}> | null>(null);

    const albumArt = useRef<HTMLDivElement>(null),
        appleMusicLogoCanvas = useRef<HTMLCanvasElement>(null);

    const { download } = useDownloader();

    useEffect(updateAppleMusicLogo, [config.appleLogo]);

    useEffect(() => {
        if (window.innerWidth < 768)
            alert("Please resize the window to at least 768px wide.");
    }, []);

    function exportAlbumArt() {
        if (!albumArt.current)
            return alert("There was an error exporting the album art.");

        albumArt.current.style.borderRadius = "0";

        document.body.style.userSelect = "none";
        document.body.style.pointerEvents = "none";

        toPng(albumArt.current, {
            width: 512,
            height: 512
        })
            .then((dataUrl) => {
                download(dataUrl, "album-art.png");

                document.body.style.userSelect = "unset";
                document.body.style.pointerEvents = "unset";

                if (albumArt.current)
                    albumArt.current.style.borderRadius = "inherit";
            })
            .catch(() => {
                document.body.style.userSelect = "unset";
                document.body.style.pointerEvents = "unset";

                if (albumArt.current)
                    albumArt.current.style.borderRadius = "inherit";
            });
    }

    function changeBackground() {
        const BackgroundModal = dynamic(
            () => import("@/components/backgroundModal"),
            {
                ssr: false
            }
        );

        setBackgroundModal(
            // @ts-ignore
            <BackgroundModal
                onClose={() => {
                    setBackgroundModal(null);
                }}
                onSelect={(url: string) => {
                    setBackgroundURL(url);
                    setBackgroundModal(null);
                }}
            />
        );
    }

    function updateAppleMusicLogo() {
        const canvas = appleMusicLogoCanvas.current;

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const appleLogo = new Image();

        appleLogo.addEventListener("load", () => {
            ctx.globalCompositeOperation = "source-over";

            ctx.fillStyle = config.appleLogo.color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = "destination-in";

            ctx.drawImage(appleLogo, 0, 0, canvas.width, canvas.height);
        });

        appleLogo.src = "/apple-music-logo-small.png";
    }

    function updateConfigValue(
        target: HTMLInputElement,
        key: keyof typeof config
    ) {
        setConfig({
            ...config,
            [target.alt]: {
                ...config[target.alt as keyof typeof config],
                [key]: target[target.type === "checkbox" ? "checked" : "value"]
            }
        });
    }

    return (
        <>
            {backgroundModal}

            <div className={styles.container}>
                <div className={styles.albumArtContainer}>
                    <div
                        className={styles.albumArt}
                        ref={albumArt}
                        style={{
                            backgroundImage: backgroundURL
                                ? `url(${backgroundURL})`
                                : undefined
                        }}
                    >
                        <div
                            className={styles.appleLogo}
                            style={{
                                display: config.appleLogo.value
                                    ? "block"
                                    : "none"
                            }}
                        >
                            <canvas
                                width={100}
                                height={25}
                                ref={appleMusicLogoCanvas}
                            ></canvas>
                        </div>

                        <div
                            className={styles.bigTitle}
                            style={{
                                color: config.bigTitle.color,
                                top: !config.appleLogo.value
                                    ? "32px"
                                    : undefined
                            }}
                        >
                            {config.bigTitle.value}
                        </div>
                        <div
                            className={styles.subTitle}
                            style={{
                                color: config.subTitle.color,
                                top: !config.appleLogo.value
                                    ? "105px"
                                    : undefined
                            }}
                        >
                            {config.subTitle.value}
                        </div>
                        <div
                            className={styles.subText}
                            style={{ color: config.subText.color }}
                        >
                            {config.subText.value}
                        </div>
                    </div>
                </div>

                <div className={styles.configContainer}>
                    {Object.keys(config).map((key) => {
                        const configItem = config[key as keyof typeof config];

                        return (
                            <>
                                <div className={styles.configItem} key={key}>
                                    <div>
                                        {configItem.type === "checkbox" ? (
                                            <span className={styles.configName}>
                                                {configItem.name}
                                            </span>
                                        ) : (
                                            <></>
                                        )}
                                        <input
                                            type={configItem.type}
                                            className={[
                                                styles.configInput,
                                                styles[key]
                                            ].join(" ")}
                                            defaultValue={
                                                configItem.type === "text"
                                                    ? configItem.value.toString()
                                                    : undefined
                                            }
                                            defaultChecked={
                                                configItem.type === "checkbox"
                                                    ? (configItem.value as boolean)
                                                    : undefined
                                            }
                                            placeholder={configItem.name}
                                            alt={key}
                                            onChange={(e) =>
                                                updateConfigValue(
                                                    e.target as HTMLInputElement,
                                                    "value" as keyof typeof config
                                                )
                                            }
                                        />
                                    </div>

                                    <input
                                        type={"color"}
                                        className={[styles.configInput].join(
                                            " "
                                        )}
                                        defaultValue={configItem.color}
                                        alt={key}
                                        onInput={(e) =>
                                            updateConfigValue(
                                                e.target as HTMLInputElement,
                                                "color" as keyof typeof config
                                            )
                                        }
                                    />
                                </div>
                            </>
                        );
                    })}

                    <div className={styles.configButtons}>
                        <button
                            className={styles.configButton}
                            onClick={changeBackground}
                        >
                            Change Background
                        </button>
                        <button
                            className={styles.configButton}
                            onClick={exportAlbumArt}
                        >
                            Download Album Art
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
