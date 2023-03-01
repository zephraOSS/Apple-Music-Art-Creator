import styles from "../styles/BackgroundModal.module.css";

export default function BackgroundModal({
    onClose,
    onSelect
}: {
    onClose: () => void;
    onSelect: (url: string) => void;
}) {
    function selectBackgroundFromFiles() {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            const reader = new FileReader();

            if (!file) return alert("No file selected");

            reader.readAsDataURL(file);
            reader.onload = () => {
                onSelect(reader.result as string);
            };
        };

        fileInput.click();
    }

    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <div className={styles.modalClose} onClick={onClose}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M18 6L6 18"
                            stroke="#333"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M6 6L18 18"
                            stroke="#333"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <div className={styles.backgrounds}>
                    <div
                        className={styles.background}
                        onClick={selectBackgroundFromFiles}
                    >
                        <svg
                            className={styles.uploadIcon}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z" />
                        </svg>
                    </div>

                    {[
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        17, 18
                    ].map((i) => {
                        return (
                            <div
                                className={styles.background}
                                style={{
                                    backgroundImage: `url('https://raw.githubusercontent.com/0neGal/albumArtCreator/main/src/backgrounds/${i}.png')`
                                }}
                                onClick={() =>
                                    onSelect(
                                        `https://raw.githubusercontent.com/0neGal/albumArtCreator/main/src/backgrounds/${i}.png`
                                    )
                                }
                                key={i}
                            ></div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
