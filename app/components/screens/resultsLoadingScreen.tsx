import { SetStateAction, Dispatch, useEffect } from 'react';
import Image from 'next/image';
import { RspnsRecord } from './aptitudeQuestionScreen';
import {
    DegreePath,
    UndergradDegree,
    GradDegree,
    GradCertDegree
} from '@/app/enums';
import styles from '@/app/styles/components/screens/resultsLoadingScreen.module.css';
import EndScreen from './endScreen';
import bookGif from '@/public/images/book-gif.gif';
import { sleep, countDegreeScoresAndGroup } from '@/app/utils/utils';

type ResultsLoadingScreenProps = {
    setScreen: Dispatch<SetStateAction<JSX.Element | null>>;
    degreePath: DegreePath;
    rspnsRecords: RspnsRecord[];
};

export default function ResultsLoadingScreen({
    setScreen,
    degreePath,
    rspnsRecords
}: ResultsLoadingScreenProps) {
    useEffect(() => {
        const matchDegreeAndSetEndScreen = async () => {
            await sleep(3000);

            const groupedDegrees: {
                [key: number]: (
                    | UndergradDegree
                    | GradDegree
                    | GradCertDegree
                )[];
            } = countDegreeScoresAndGroup(degreePath, rspnsRecords);
            const allScores = Object.keys(groupedDegrees).map((key) =>
                parseInt(key)
            );
            const maxScore = Math.max(...allScores);
            const maxScoreDegrees = groupedDegrees[maxScore];

            if (maxScoreDegrees.length === 1) {
                setScreen(
                    <EndScreen
                        setScreen={setScreen}
                        degreePath={degreePath}
                        matchedDegree={maxScoreDegrees[0]}
                    />
                );
            } else {
                const randInd = Math.floor(
                    Math.random() * maxScoreDegrees.length
                );
                setScreen(
                    <EndScreen
                        setScreen={setScreen}
                        degreePath={degreePath}
                        matchedDegree={maxScoreDegrees[randInd]}
                    />
                );
            }
        };

        matchDegreeAndSetEndScreen();
    });
    return (
        <div className={styles[`results_loading_screen_${degreePath}`]}>
            <Image
                src={bookGif}
                alt="results loading gif"
                height={250}
                width={250}
            />
            <h2>Compiling results...</h2>
        </div>
    );
}
