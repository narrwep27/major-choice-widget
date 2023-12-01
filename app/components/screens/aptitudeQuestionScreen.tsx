import styles from '@/app/styles/components/screens/aptitudeQuestionScreen.module.css';
import { useState } from 'react';
import {
    AptitudeQuestionScreenProps,
    AptitudeQstn,
    QstnObjState,
    RspnsRecord
} from '@/app/utils/aptitudeQuestionScreen/types';
import {
    getReadableDegreeName,
    createNewRspnsHstryArr
} from '@/app/utils/aptitudeQuestionScreen/utils';
import data from '@/static/aptitude-questions.json';
import DegreeChoiceScreen from './degreeChoiceScreen';
import ResultsLoadingScreen from './resultsLoadingScreen';

export default function AptitudeQuestionScreen({
    degreePath,
    setScreen
}: AptitudeQuestionScreenProps): JSX.Element {
    const aptitudeQstnArr: AptitudeQstn[] =
        data.aptitudeQuestionObjects[degreePath];
    const readableDegree: string = getReadableDegreeName(degreePath);

    const [qstnObj, setQstnObj] = useState<QstnObjState>({
        qstnInd: 0,
        currQstn: aptitudeQstnArr[0].question
    });

    const [rspnsHstryArr, setRspnsHstryArr] = useState<RspnsRecord[]>(
        aptitudeQstnArr.map((aptQstn, qstnInd) => ({
            aptQstn,
            qstnInd,
            usrRspns: null
        }))
    );

    const updateQstnState = (
        progress: 1 | -1,
        currRspnsHstryArr: RspnsRecord[]
    ) => {
        const newQstnInd: number = qstnObj.qstnInd + progress;
        if (newQstnInd === aptitudeQstnArr.length) {
            setScreen(
                <ResultsLoadingScreen
                    setScreen={setScreen}
                    rsponsRecords={currRspnsHstryArr}
                    degreePath={degreePath}
                />
            );
            return;
        } else if (newQstnInd < 0) {
            setScreen(<DegreeChoiceScreen setScreen={setScreen} />);
            return;
        }

        setQstnObj({
            qstnInd: newQstnInd,
            currQstn: aptitudeQstnArr[newQstnInd].question
        });
    };

    const handleClick = (usrRspns: 'yes' | 'no' | 'skip' | null) => {
        const indToUpdate =
            usrRspns === null ? qstnObj.qstnInd - 1 : qstnObj.qstnInd;
        const qstnProgress = usrRspns === null ? -1 : 1;
        const newRspnsHstryArr: RspnsRecord[] = createNewRspnsHstryArr(
            rspnsHstryArr,
            usrRspns,
            indToUpdate
        );
        setRspnsHstryArr(newRspnsHstryArr);
        updateQstnState(qstnProgress, newRspnsHstryArr);
    };

    return (
        <div className={styles.aptitude_question_screen}>
            <div className={styles[`${degreePath}_header`]}>
                <h3>{readableDegree} Path</h3>
                <p>Answer each statement to the best of your ability.</p>
            </div>
            <div className={styles.aptitude_question_screen_content_div}>
                <h1>{qstnObj.currQstn}</h1>
                <div className={styles.aptitude_question_screen_yes_no_div}>
                    <button
                        className={
                            styles[
                                `aptitude_question_screen_yes_btn_${degreePath}`
                            ]
                        }
                        onClick={() => handleClick('yes')}
                    >
                        YES
                    </button>
                    <button
                        className={styles.aptitude_question_screen_no_btn}
                        onClick={() => handleClick('no')}
                    >
                        NO
                    </button>
                </div>
            </div>
            <div className={styles.aptitude_question_screen_navigation_div}>
                <button
                    className={
                        styles.aptitude_question_screen_navigation_previous_btn
                    }
                    onClick={() => handleClick(null)}
                >
                    &#9204; Previous
                </button>
                <button
                    className={
                        styles.aptitude_question_screen_navigation_skip_btn
                    }
                    onClick={() => handleClick('skip')}
                >
                    Skip &#9197;
                </button>
            </div>
        </div>
    );
}
