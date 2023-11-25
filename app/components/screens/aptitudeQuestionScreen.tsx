import styles from '@/app/styles/components/screens/aptitudeQuestionScreen.module.css';
import { JSX, Dispatch, SetStateAction, useState } from 'react';
import { DegreeType } from '@/app/components/ui/degreeChoiceBtn';

type AptitudeQuestionScreenProps = {
    degreeType: DegreeType;
    setScreen: Dispatch<SetStateAction<JSX.Element | null>>;
};

export default function AptitudeQuestionScreen({
    degreeType
}: AptitudeQuestionScreenProps): JSX.Element {
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

    return (
        <div className={styles.aptitude_question_screen}>
            <div className={styles[`${degreeType}_header`]}>
                <h3>{readableDegree} Path</h3>
                <p>Answer each statement to the best of your ability.</p>
            </div>
            <div className={styles.aptitude_question_screen_content_div}>
                <h1>question</h1>
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
                <button>Previous</button>
                <button>Skip</button>
            </div>
        </div>
    );
}
