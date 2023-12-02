import { SetStateAction, Dispatch, useEffect } from 'react';
import Image from 'next/image';
import { RspnsRecord } from './aptitudeQuestionScreen';
import { DegreePath } from '@/app/enums';
import styles from '@/app/styles/components/screens/resultsLoadingScreen.module.css';
import EndScreen from './endScreen';
import bookGif from '@/public/images/book-gif.gif';
import { sleep, matchDegrees } from '@/app/utils/utils';

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
            console.log(matchDegrees(degreePath, rspnsRecords));
            console.log('transfer to EndScreen');
            // setScreen(<EndScreen setScreen={setScreen} />);
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
