import styles from '@/app/styles/components/screens/aptitudeQuestionScreen.module.css';
import { useRef, useState, Dispatch, SetStateAction } from 'react';
import { DegreePath } from '@/app/enums';
import {
    getReadableDegreeName,
    createNewRspnsHstryArr
} from '@/app/utils/utils';
import data from '@/app/static/aptitude-questions.json';
import DegreeChoiceScreen from './degreeChoiceScreen';
import ResultsLoadingScreen from './resultsLoadingScreen';

type AptitudeQuestionScreenProps = {
    degreePath: DegreePath;
    setScreen: Dispatch<SetStateAction<JSX.Element | null>>;
};
type QstnObjState = {
    qstnInd: number;
    currQstn: string;
};
type AptitudeQstn = {
    question: string;
    positiveResponseDegrees: string[];
    negativeResponseDegrees: string[];
};
export type RspnsRecord = {
    aptQstn: AptitudeQstn;
    qstnInd: number;
    usrRspns: 'yes' | 'no' | 'skip' | null;
};

export default function AptitudeQuestionScreen({
    degreePath,
    setScreen
}: AptitudeQuestionScreenProps): JSX.Element {
    const aptitudeQstnArr: AptitudeQstn[] =
        data.aptitudeQuestionObjects[degreePath];

    const rspnsHstryArr = useRef<RspnsRecord[]>(
        aptitudeQstnArr.map((aptQstn, qstnInd) => ({
            aptQstn,
            qstnInd,
            usrRspns: null
        }))
    );
    const [qstnObj, setQstnObj] = useState<QstnObjState>({
        qstnInd: 0,
        currQstn: aptitudeQstnArr[0].question
    });

    const updateQstnState = (progress: 1 | -1) => {
        const newQstnInd: number = qstnObj.qstnInd + progress;
        if (newQstnInd === aptitudeQstnArr.length) {
            setScreen(
                <ResultsLoadingScreen
                    setScreen={setScreen}
                    rspnsRecords={rspnsHstryArr.current}
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
        rspnsHstryArr.current = createNewRspnsHstryArr(
            rspnsHstryArr.current,
            usrRspns,
            qstnObj.qstnInd
        );

        const qstnProgress = usrRspns === null ? -1 : 1;
        updateQstnState(qstnProgress);
    };

    return (
        <div className={styles.aptitude_question_screen}>
            <div className={styles[`header_${degreePath}`]}>
                <h3>{getReadableDegreeName(degreePath)} Path</h3>
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
