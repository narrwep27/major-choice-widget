import styles from '@/app/styles/components/screens/aptitudeQuestionScreen.module.css';
import { JSX, Dispatch, SetStateAction, useState, useEffect } from 'react';
import { DegreeType } from '@/app/enums';
import data from '@/static/aptitude-questions.json';

type AptitudeQuestionScreenProps = {
    degreeType: DegreeType;
    setScreen: Dispatch<SetStateAction<JSX.Element | null>>;
};

export default function AptitudeQuestionScreen({
    degreeType,
    setScreen
}: AptitudeQuestionScreenProps): JSX.Element {
    const questionArr: string[] = data.aptitudeQuestionObjects[degreeType];
    const [questionInd, setQuestionInd] = useState<number>(0);
    const [currQuestion, setCurrQuestion] = useState<string>(
        questionArr[questionInd]
    );

    const [undergradScores, setUndergradScores] = useState<{
        baArtsDigitalComm: number | null;
        baSciSimAndGameDesignScore: number | null;
    }>({
        baArtsDigitalComm: degreeType === DegreeType.UNDERGRADUATE ? 0 : null,
        baSciSimAndGameDesignScore:
            degreeType === DegreeType.UNDERGRADUATE ? 0 : null
    });
    const [gradScores, setGradScores] = useState<{
        maArtsIntegDesign: number | null;
        maFineArtsIntegDesign: number | null;
        maSciIntegDesAndInfoArch: number | null;
        docSciInfoAndIntegDesScore: number | null;
    }>({
        maArtsIntegDesign: degreeType === DegreeType.GRADUATE ? 0 : null,
        maFineArtsIntegDesign: degreeType === DegreeType.GRADUATE ? 0 : null,
        maSciIntegDesAndInfoArch: degreeType === DegreeType.GRADUATE ? 0 : null,
        docSciInfoAndIntegDesScore:
            degreeType === DegreeType.GRADUATE ? 0 : null
    });
    const [gradCertScores, setGradCertScores] = useState<{
        certDigitalComm: number | null;
        certUserExp: number | null;
    }>({
        certDigitalComm:
            degreeType === DegreeType.GRADUATE_CERTIFICATE ? 0 : null,
        certUserExp: degreeType === DegreeType.GRADUATE_CERTIFICATE ? 0 : null
    });

    let readableDegree: string;
    if (degreeType === DegreeType.UNDERGRADUATE) {
        readableDegree = 'Undergraduate';
    } else if (degreeType === DegreeType.GRADUATE) {
        readableDegree = 'Graduate';
    } else if (degreeType === DegreeType.GRADUATE_CERTIFICATE) {
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
            <div className={styles[`${degreeType}_header`]}>
                <h3>{readableDegree} Path</h3>
                <p>Answer each statement to the best of your ability.</p>
            </div>
            <div className={styles.aptitude_question_screen_content_div}>
                <h1>{currQuestion}</h1>
                <div className={styles.aptitude_question_screen_yes_no_div}>
                    <button
                        className={
                            styles[
                                `aptitude_question_screen_yes_btn_${degreeType}`
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
