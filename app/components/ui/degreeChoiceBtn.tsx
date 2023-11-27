import { JSX, Dispatch, SetStateAction } from 'react';
import styles from '@/app/styles/components/ui/degreeChoiceBtn.module.css';
import AptitudeQuestionScreen from '@/app/components/screens/aptitudeQuestionScreen';
import { DegreeType } from '@/app/enums';

type DegreeChoiceBtnProps = {
    degreeType: DegreeType;
    setScreen: Dispatch<SetStateAction<JSX.Element | null>>;
};

export default function DegreeChoiceBtn({
    degreeType,
    setScreen
}: DegreeChoiceBtnProps): JSX.Element {
    let readableDegreeStr: string;
    if (degreeType === DegreeType.UNDERGRADUATE) {
        readableDegreeStr = 'Undergraduate';
    } else if (degreeType === DegreeType.GRADUATE) {
        readableDegreeStr = 'Graduate';
    } else if (degreeType === DegreeType.GRADUATE_CERTIFICATE) {
        readableDegreeStr = 'Accelerated Graduate Certificate';
    } else {
        readableDegreeStr = "I don't know";
    }

    return (
        <button
            className={styles[degreeType]}
            onClick={() =>
                setScreen(
                    <AptitudeQuestionScreen
                        degreeType={degreeType}
                        setScreen={setScreen}
                    />
                )
            }
        >
            {readableDegreeStr}
        </button>
    );
}
