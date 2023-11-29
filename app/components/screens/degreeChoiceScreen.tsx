import styles from '@/app/styles/components/screens/degreeChoiceScreen.module.css';
import { Dispatch, SetStateAction, JSX } from 'react';
import DegreeChoiceBtn from '../ui/degreeChoiceBtn';
import { DegreePath } from '@/app/enums';

export default function DegreeChoiceScreen({
    setScreen
}: {
    setScreen: Dispatch<SetStateAction<JSX.Element | null>>;
}): JSX.Element {
    return (
        <div className={styles.degree_choice_screen}>
            <div className={styles.degree_choice_screen_text}>
                <h2>What type of degree program are you looking for?</h2>
                <p>Take the quiz and find out what program is right for you.</p>
            </div>
            <div className={styles.degree_choice_screen_button_div}>
                <DegreeChoiceBtn
                    degreePath={DegreePath.Undergraduate}
                    setScreen={setScreen}
                />
                <DegreeChoiceBtn
                    degreePath={DegreePath.Graduate}
                    setScreen={setScreen}
                />
                <DegreeChoiceBtn
                    degreePath={DegreePath.GraduateCertificate}
                    setScreen={setScreen}
                />
                {/* <DegreeChoiceBtn
                    degreePath={DegreePath.None}
                    setScreen={setScreen}
                /> */}
            </div>
        </div>
    );
}
