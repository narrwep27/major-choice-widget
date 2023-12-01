import { SetStateAction, Dispatch, useEffect } from 'react';
import Image from 'next/image';
import { RspnsRecord } from '@/app/utils/aptitudeQuestionScreen/types';
import { DegreePath } from '@/app/enums';
import styles from '@/app/styles/components/screens/resultsLoadingScreen.module.css';
import EndScreen from './endScreen';
import bookGif from '@/public/images/book-gif.gif';

type ResultsLoadingScreenProps = {
    setScreen: Dispatch<SetStateAction<JSX.Element | null>>;
    rsponsRecords: RspnsRecord[];
    degreePath: DegreePath;
};

const sleep = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export default function ResultsLoadingScreen({
    setScreen,
    rsponsRecords,
    degreePath
}: ResultsLoadingScreenProps) {
    const matchDegrees = () => {};
    useEffect(() => {
        const matchDegreeAndSetEndScreen = async () => {
            await sleep(3000);
            // setScreen(<EndScreen setScreen={setScreen} />);
            console.log(rsponsRecords);
            console.log('transfer to EndScreen');
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
