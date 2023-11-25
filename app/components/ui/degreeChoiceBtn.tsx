import { JSX, Dispatch, SetStateAction } from 'react';
import styles from '@/app/styles/components/ui/degreeChoiceBtn.module.css';
import AptitudeQuestionScreen from '@/app/components/screens/aptitudeQuestionScreen';

type DegreeChoiceBtnProps = {
    degreeType: DegreeType;
    setScreen: Dispatch<SetStateAction<JSX.Element | null>>;
};

export enum DegreeType {
    UNDERGRADUATE = 'undergraduate',
    GRADUATE = 'graduate',
    GRADUATE_CERTIFICATE = 'graduate_certificate',
    NONE = 'none'
}

export default function DegreeChoiceBtn({
    degreeType,
    setScreen
}: DegreeChoiceBtnProps): JSX.Element {
    let nameStrArr: string[];
    if (degreeType === DegreeType.UNDERGRADUATE) {
        nameStrArr = ['Undergraduate'];
    } else if (degreeType === DegreeType.GRADUATE) {
        nameStrArr = ['Graduate'];
    } else if (degreeType === DegreeType.GRADUATE_CERTIFICATE) {
        nameStrArr = ['Accelerated', 'Graduate', 'Certificate'];
    } else {
        nameStrArr = ["I don't know"];
    }

    return (
        <button
            className={styles[degreeType]}
            onClick={() =>
                setScreen(
                    <AptitudeQuestionScreen
                        key={degreeType}
                        degreeType={degreeType}
                        setScreen={setScreen}
                    />
                )
            }
        >
            {nameStrArr.map((word) => (
                <p>{word}</p>
            ))}
        </button>
    );
}
