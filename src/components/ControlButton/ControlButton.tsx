import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from './ControlButton.module.scss'
import {copyToClickBoard} from "../../utils";

interface Props {
    handlerReload(): void
}

const handleShareClick = async () => {
    if (navigator.share) {
        await navigator.share({
            title: 'Colors',
            text: 'Take a look at this color!',
            url: window.location.href,
        })
    }
    else {
        await copyToClickBoard(window.location.href)
    }
}
const ControlButton = ({handlerReload}: Props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.reload} onClick={handlerReload}>
                <FontAwesomeIcon icon={["fas", "rotate"]}/>
            </div>
            <button aria-label={"share"} className={styles.share} onClick={handleShareClick}>
                <FontAwesomeIcon icon={["fas", "share"]}/>
            </button>
        </div>
    );
}
export default React.memo(ControlButton)