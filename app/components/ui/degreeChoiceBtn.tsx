import { JSX, Dispatch, SetStateAction } from 'react';
import styles from '@/app/styles/components/ui/degreeChoiceBtn.module.css';
import AptitudeQuestionScreen from '@/app/components/screens/aptitudeQuestionScreen';
import { DegreePath } from '@/app/enums';

type DegreeChoiceBtnProps = {
    degreePath: DegreePath;
    setScreen: Dispatch<SetStateAction<JSX.Element | null>>;
};

export default function DegreeChoiceBtn({
    degreePath,
    setScreen
}: DegreeChoiceBtnProps): JSX.Element {
    let readableDegreeStr: string;
    if (degreePath === DegreePath.Undergraduate) {
        readableDegreeStr = 'Undergraduate';
    } else if (degreePath === DegreePath.Graduate) {
        readableDegreeStr = 'Graduate';
    } else if (degreePath === DegreePath.GraduateCertificate) {
        readableDegreeStr = 'Accelerated Graduate Certificate';
    } else {
        readableDegreeStr = "I don't know";
    }

    return (
        <button
            className={styles[degreePath]}
            onClick={() =>
                setScreen(
                    <AptitudeQuestionScreen
                        degreePath={degreePath}
                        setScreen={setScreen}
                    />
                )
            }
        >
            {readableDegreeStr}
        </button>
    );
}
