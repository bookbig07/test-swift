import React, { useState } from 'react';
import Translation from '../translation/Translation'
import { useTranslation } from 'react-i18next';
import './Shape.scss'

function Shape() {
    const [shapeRowOne, setShapeRowOne] = useState<string[]>(['rectangle', 'parallelogram', 'oval']);
    const [shapeRowTwo, setShapeRowTwo] = useState<string[]>(['trapezoid', '', 'circle']);
    const [isSwapped, setIsSwapped] = useState<boolean>(false);
    const { t } = useTranslation();

    const moveShapeRowOneToRowTwo = () => {
        const OldshapeRowOne = shapeRowOne.slice(1);
        const OldshapeRowTwo = shapeRowTwo.slice(1);
        const newShapeRowOne = [...OldshapeRowOne, shapeRowTwo[0]];
        const newShapeRowTwo = [...OldshapeRowTwo, shapeRowOne[0]];
        setShapeRowOne(newShapeRowOne);
        setShapeRowTwo(newShapeRowTwo);
    };

    const moveShapeRowTwoToRowOne = () => {
        const oldShapeRowTwo = shapeRowTwo.slice(0, -1);
        const oldShapeRowOne = shapeRowOne.slice(0, -1);
        const newShapeRowOne = [shapeRowTwo.slice(-1)[0], ...oldShapeRowOne];
        const newShapeRowTwo = [shapeRowOne.slice(-1)[0], ...oldShapeRowTwo];
        setShapeRowOne(newShapeRowOne);
        setShapeRowTwo(newShapeRowTwo);
    };

    const swapShapes = () => {
        const indexOne = Math.floor(Math.random() * shapeRowOne.length);
        const indexTwo = Math.floor(Math.random() * shapeRowTwo.length);
        const temp = shapeRowOne[indexOne];
        shapeRowOne[indexOne] = shapeRowTwo[indexTwo];
        shapeRowTwo[indexTwo] = temp;
        setShapeRowOne([...shapeRowOne]);
        setShapeRowTwo([...shapeRowTwo]);
    };
      
    const movePosition = () => {
        setIsSwapped(!isSwapped);
    }

    return (
        <>
            <Translation/>
            <div className="bodyShape">
                <div className="control">
                    <div className="box" onClick={moveShapeRowOneToRowTwo}>
                        <div className="shape">
                            <div className="shape-left"></div>
                        </div>
                        <div className="text">
                            <span>{t('move_shape')}</span>
                        </div>
                    </div>
                    <div className="box-pair" onClick={movePosition}>
                        <div className="shape">
                            <div className="shape-top"></div>
                            <div className="shape-bottom"></div>
                        </div>
                        <div className="text">
                            <span>{t('move_position')}</span>
                        </div>
                    </div>
                    <div className="box" onClick={moveShapeRowTwoToRowOne}>
                        <div className="shape">
                            <div className="shape-right"></div>
                        </div>
                        <div className="text">
                            <span>{t('move_shape')}</span>
                        </div>
                    </div>
                </div>
                <div className="underline"></div>
                <div className="card-shape">
                    <div className={"row" + (!isSwapped ? " justify-end" : "")}>
                        {shapeRowOne.map((box, index) => (
                            <div className="row-shape" key={index} onClick={swapShapes}>
                                <div className={"shape-type " + box}></div>
                            </div>
                        ))}
                    </div>
                    <div className={"row" + (isSwapped ? " justify-end" : "")}>
                        {shapeRowTwo.map((box, index) => (
                            <div className="row-shape" key={index} onClick={swapShapes}>
                                <div className={"shape-type " + box}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shape