import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import {
    DegreePath,
    UndergradDegree,
    GradDegree,
    GradCertDegree
} from '@/app/enums';
import styles from '@/app/styles/components/screens/endScreen.module.css';
import StartOverIcon from '@/public/images/Start-over_blk.png';
import DegreeChoiceScreen from './degreeChoiceScreen';

type EndScreenProps = {
    setScreen: Dispatch<SetStateAction<JSX.Element | null>>;
    degreePath: DegreePath;
    matchedDegree: UndergradDegree | GradDegree | GradCertDegree;
};

const createReadableDegreeStr = (
    degree: UndergradDegree | GradDegree | GradCertDegree
): string => {
    const pascalCaseDegree = degree[0].toUpperCase() + degree.substring(1);
    const splitDegreeArr = pascalCaseDegree.split(/(?=[A-Z])/g);
    return splitDegreeArr.join(' ');
};

export default function EndScreen({
    setScreen,
    degreePath,
    matchedDegree
}: EndScreenProps) {
    const readableDegreeStr = createReadableDegreeStr(matchedDegree);
    const inSplitDegreeArr = readableDegreeStr.split(' In ');
    return (
        <div className={styles.end_screen}>
            <header className={styles[`end_screen_header_${degreePath}`]} />
            <div className={styles.end_screen_content_div}>
                <p>
                    Based on your answers the
                    <br />
                    following might be the best major
                </p>
                <h1>{readableDegreeStr}</h1>
                <button
                    className={
                        styles[
                            `end_screen_content_learn_more_btn_${degreePath}`
                        ]
                    }
                >
                    LEARN MORE
                </button>
                <div className={styles.end_screen_content_link_div}>
                    <a href="#">
                        <span>&#9205;</span> Career paths in{' '}
                        {inSplitDegreeArr[1]}
                    </a>
                    <a href="#">
                        <span>&#9205;</span> Student testimonials
                    </a>
                </div>
            </div>
            <button
                className={styles.start_over_btn}
                onClick={() =>
                    setScreen(<DegreeChoiceScreen setScreen={setScreen} />)
                }
            >
                <Image
                    src={StartOverIcon}
                    alt="Start over button"
                    width={95}
                    height={95}
                />
                <p>
                    Start
                    <br />
                    over
                </p>
            </button>
        </div>
    );
}
