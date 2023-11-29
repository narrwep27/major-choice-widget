import styles from '@/app/styles/components/screens/aptitudeQuestionScreen.module.css';
import { JSX, Dispatch, SetStateAction, useState, useEffect } from 'react';
import {
    DegreePath,
    UndergradDegree,
    GradDegree,
    GradCertDegree
} from '@/app/enums';
import data from '@/static/aptitude-questions.json';

type AptitudeQuestionScreenProps = {
    degreePath: DegreePath;
    setScreen: Dispatch<SetStateAction<JSX.Element | null>>;
};
type AptitudeQuestionType = {
    question: string;
    positiveResponseDegrees: string[];
    negativeResponseDegrees: string[];
};
type UnderGradScoresType = {
    [UndergradDegree.BaArtsDigitalComm]: number | null;
    [UndergradDegree.BaSciSimAndGameDesign]: number | null;
};
type GradScoresType = {
    [GradDegree.MaArtsIntegDesign]: number | null;
    [GradDegree.MaFineArtsIntegDesign]: number | null;
    [GradDegree.MaSciInterDesignAndInfoArch]: number | null;
    [GradDegree.DocSciInfoAndInterDesign]: number | null;
};
type GradCertScoresType = {
    [GradCertDegree.CertDigitialComm]: number | null;
    [GradCertDegree.CertUserExpDesign]: number | null;
};

export default function AptitudeQuestionScreen({
    degreePath,
    setScreen
}: AptitudeQuestionScreenProps): JSX.Element {
    const questionArr: AptitudeQuestionType[] =
        data.aptitudeQuestionObjects[degreePath];
    const [questionInd, setQuestionInd] = useState<number>(0);
    const [currQuestion, setCurrQuestion] = useState<string>(
        questionArr[questionInd].question
    );

    const [undergradScores, setUndergradScores] = useState<UnderGradScoresType>(
        {
            [UndergradDegree.BaArtsDigitalComm]:
                degreePath === DegreePath.Undergraduate ? 0 : null,
            [UndergradDegree.BaSciSimAndGameDesign]:
                degreePath === DegreePath.Undergraduate ? 0 : null
        }
    );
    const [gradScores, setGradScores] = useState<GradScoresType>({
        [GradDegree.MaArtsIntegDesign]:
            degreePath === DegreePath.Graduate ? 0 : null,
        [GradDegree.MaFineArtsIntegDesign]:
            degreePath === DegreePath.Graduate ? 0 : null,
        [GradDegree.MaSciInterDesignAndInfoArch]:
            degreePath === DegreePath.Graduate ? 0 : null,
        [GradDegree.DocSciInfoAndInterDesign]:
            degreePath === DegreePath.Graduate ? 0 : null
    });
    const [gradCertScores, setGradCertScores] = useState<GradCertScoresType>({
        [GradCertDegree.CertDigitialComm]:
            degreePath === DegreePath.GraduateCertificate ? 0 : null,
        [GradCertDegree.CertUserExpDesign]:
            degreePath === DegreePath.GraduateCertificate ? 0 : null
    });

    let readableDegree: string;
    if (degreePath === DegreePath.Undergraduate) {
        readableDegree = 'Undergraduate';
    } else if (degreePath === DegreePath.Graduate) {
        readableDegree = 'Graduate';
    } else if (degreePath === DegreePath.GraduateCertificate) {
        readableDegree = 'Graduate Certificate';
    } else {
        readableDegree = 'None';
    }

    useEffect(() => {
        if (questionInd === questionArr.length) {
            //setScreen(<EndScreen />);
        }
    }, []);

    return (
        <div className={styles.aptitude_question_screen}>
            <div className={styles[`${degreePath}_header`]}>
                <h3>{readableDegree} Path</h3>
                <p>Answer each statement to the best of your ability.</p>
            </div>
            <div className={styles.aptitude_question_screen_content_div}>
                <h1>{currQuestion}</h1>
                <div className={styles.aptitude_question_screen_yes_no_div}>
                    <button
                        className={
                            styles[
                                `aptitude_question_screen_yes_btn_${degreePath}`
                            ]
                        }
                    >
                        YES
                    </button>
                    <button className={styles.aptitude_question_screen_no_btn}>
                        NO
                    </button>
                </div>
            </div>
            <div className={styles.aptitude_question_screen_navigation_div}>
                <button
                    className={
                        styles.aptitude_question_screen_navigation_previous_btn
                    }
                >
                    &#9204; Previous
                </button>
                <button
                    className={
                        styles.aptitude_question_screen_navigation_skip_btn
                    }
                >
                    Skip &#9197;
                </button>
            </div>
        </div>
    );
}
