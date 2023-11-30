import styles from '@/app/styles/components/screens/aptitudeQuestionScreen.module.css';
import { useState } from 'react';
import {
    DegreePath,
    UndergradDegree,
    GradDegree,
    GradCertDegree
} from '@/app/enums';
import {
    AptitudeQuestionScreenProps,
    AptitudeQuestion,
    QstnObjState,
    UndergradScoreState,
    GradScoreState,
    GradCertScoreState
} from '@/app/utils/aptitudeQuestionScreen/types';
import {
    isUndergradScoreState,
    isGradScoreState,
    isGradCertScoreState
} from '@/app/utils/aptitudeQuestionScreen/typeGuards';
import {
    getReadableDegreeName,
    getNewScoreObj
} from '@/app/utils/aptitudeQuestionScreen/utils';
import data from '@/static/aptitude-questions.json';
import DegreeChoiceScreen from './degreeChoiceScreen';

export default function AptitudeQuestionScreen({
    degreePath,
    setScreen
}: AptitudeQuestionScreenProps): JSX.Element {
    const qstnArr: AptitudeQuestion[] =
        data.aptitudeQuestionObjects[degreePath];
    const readableDegree: string = getReadableDegreeName(degreePath);

    const [qstnObj, setQstnObj] = useState<QstnObjState>({
        qstnInd: 0,
        currQstn: qstnArr[0].question,
        positiveResponseDegrees: qstnArr[0].positiveResponseDegrees,
        negativeResponseDegrees: qstnArr[0].negativeResponseDegrees
    });

    const [undergradScore, setUndergradScores] =
        useState<UndergradScoreState | null>(
            degreePath === DegreePath.Undergraduate
                ? {
                      [UndergradDegree.BaArtsDigitalComm]: 0,
                      [UndergradDegree.BaSciSimAndGameDesign]: 0
                  }
                : null
        );
    const [gradScore, setGradScores] = useState<GradScoreState | null>(
        degreePath === DegreePath.Graduate
            ? {
                  [GradDegree.MaArtsIntegDesign]: 0,
                  [GradDegree.MaFineArtsIntegDesign]: 0,
                  [GradDegree.MaSciInterDesignAndInfoArch]: 0,
                  [GradDegree.DocSciInfoAndInterDesign]: 0
              }
            : null
    );
    const [gradCertScore, setGradCertScores] =
        useState<GradCertScoreState | null>(
            degreePath === DegreePath.GraduateCertificate
                ? {
                      [GradCertDegree.CertDigitialComm]: 0,
                      [GradCertDegree.CertUserExpDesign]: 0
                  }
                : null
        );

    const updateScores = (
        incrementedScores: string[],
        decrementedScores: string[]
    ): void => {
        if (degreePath === DegreePath.Undergraduate && undergradScore != null) {
            const newScoreState = getNewScoreObj(
                undergradScore,
                incrementedScores,
                decrementedScores
            );
            if (isUndergradScoreState(newScoreState))
                setUndergradScores(newScoreState);
        } else if (degreePath === DegreePath.Graduate && gradScore != null) {
            const newScoreState = getNewScoreObj(
                gradScore,
                incrementedScores,
                decrementedScores
            );
            if (isGradScoreState(newScoreState)) setGradScores(newScoreState);
        } else if (
            degreePath === DegreePath.GraduateCertificate &&
            gradCertScore != null
        ) {
            const newScoreState = getNewScoreObj(
                gradCertScore,
                incrementedScores,
                decrementedScores
            );
            if (isGradCertScoreState(newScoreState))
                setGradCertScores(newScoreState);
        }
    };

    const updateQstnState = (progress: 1 | -1) => {
        const newQstnInd: number = qstnObj.qstnInd + progress;
        if (newQstnInd === qstnArr.length) {
            //setScreen(<ResultsLoadingScreen />)
            return;
        } else if (newQstnInd < 0) {
            setScreen(<DegreeChoiceScreen setScreen={setScreen} />);
            return;
        }

        setQstnObj({
            qstnInd: newQstnInd,
            currQstn: qstnArr[newQstnInd].question,
            positiveResponseDegrees:
                qstnArr[newQstnInd].positiveResponseDegrees,
            negativeResponseDegrees: qstnArr[newQstnInd].negativeResponseDegrees
        });
    };

    const yesClicked = () => {
        updateScores(
            qstnObj.positiveResponseDegrees,
            qstnObj.negativeResponseDegrees
        );
        updateQstnState(1);
    };

    const noClicked = () => {
        updateScores(
            qstnObj.negativeResponseDegrees,
            qstnObj.positiveResponseDegrees
        );
        updateQstnState(1);
    };

    const previousClicked = () => {
        updateQstnState(-1);
    };

    const skipClicked = () => {
        updateQstnState(1);
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
                        onClick={yesClicked}
                    >
                        YES
                    </button>
                    <button
                        className={styles.aptitude_question_screen_no_btn}
                        onClick={noClicked}
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
                    onClick={previousClicked}
                >
                    &#9204; Previous
                </button>
                <button
                    className={
                        styles.aptitude_question_screen_navigation_skip_btn
                    }
                    onClick={skipClicked}
                >
                    Skip &#9197;
                </button>
            </div>
        </div>
    );
}
