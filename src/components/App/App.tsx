import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    countCol,
    generateColorForURL,
    generateRandomColor,
    isInCorrectnessCheck,
    parseColorFromParam
} from "../../utils";

import styles from "./App.module.scss";
import ControlButton from "../ControlButton/ControlButton";
import ColumnBlock from "../ColumnBlock/ColumnBlock";


const App = () => {
    const {colorId} = useParams()

    const navigate = useNavigate()

    const [isLocks, setIsLocks] = React.useState(Array.from({length: countCol}, _ => false))
    const [colors, setColors] = React.useState(colorId
        ? parseColorFromParam(colorId)
        : Array.from({length: countCol}, generateRandomColor)
    )
    React.useEffect(() => {
        const handleResize = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        handleResize()
        window.addEventListener('resize', handleResize);
        return window.removeEventListener('resize', handleResize)
    }, [])
    React.useEffect(() => {
        if (!colorId || isInCorrectnessCheck(colorId)) {
            navigate(generateColorForURL(colors))
        }
    }, [colorId, colors, navigate])
    const handleReloadColor = React.useCallback(() => setColors(
        colors => {
            const newColor = colors.map(
                (value, index) => isLocks[index]
                    ? value
                    : generateRandomColor()
            )
            navigate(generateColorForURL(newColor))
            return newColor
        }
    ), [isLocks, navigate])
    useEffect(() => {
        const handlerKeyDownEvent = (event: KeyboardEvent) => {
            if (event.code.toLowerCase() === 'space') {
                event.preventDefault()
                handleReloadColor()
            }
        }
        window.addEventListener("keydown", handlerKeyDownEvent)
        return () => {
            window.removeEventListener("keydown", handlerKeyDownEvent)
        }
    }, [handleReloadColor, isLocks])
    const handleClickLock = React.useCallback((index: number, value: boolean) =>
        setIsLocks(isLocks => isLocks.map((content, i) => i === index ? value : content)),
        []
    )
    return (
        <div className={styles.wrapper}>
            {isLocks.map((lock, index) =>
                <ColumnBlock
                    key={index}
                    index={index}
                    isLock={lock}
                    color={colors[index]}
                    onClickLock={handleClickLock}
                />
            )}
            <ControlButton handlerReload={handleReloadColor}/>
        </div>
    )
}
export default App
