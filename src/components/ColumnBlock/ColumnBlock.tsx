import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {addHash, copyToClickBoard, luminance,} from "../../utils";
import styles from './ColumnBlock.module.scss'

interface Props {
    index: number
    isLock: boolean
    color: string

    onClickLock(index: number, value: boolean): void
}

const ColumnBlock: React.FC<Props> = ({index, isLock, color, onClickLock}) => {
    return (
        <div style={{background: addHash(color)}} className={[
            styles.col,
            luminance(color) > 0.5 ? styles.dark : styles.light
        ].join(" ")}
        >
            <div className={styles.codeBlockContent}>
                <code className={styles.codeBlockLine}>
                    <span className={styles.codeTextLine}>{addHash(color)}</span>
                </code>
                <button type="button" aria-label={"copy"} onClick={() => copyToClickBoard(addHash(color))}
                        className={styles.copyButton}>
                    <FontAwesomeIcon icon={["fas", "copy"]}/>
                </button>
            </div>
            <button aria-label={isLock ? 'lock' : 'open'} onClick={() => onClickLock(index, !isLock)}
                    className={styles.lock}>
                <FontAwesomeIcon icon={["fas", isLock ? 'lock' : 'lock-open']}/>
            </button>
        </div>
    );
};
export default React.memo(ColumnBlock);