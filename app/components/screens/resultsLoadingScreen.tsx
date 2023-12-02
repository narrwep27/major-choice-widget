import { SetStateAction, Dispatch, useEffect } from 'react';
import Image from 'next/image';
import { RspnsRecord } from '@/app/utils/aptitudeQuestionScreen/types';
import {
    DegreePath,
    UndergradDegree,
    GradDegree,
    GradCertDegree
} from '@/app/enums';
import styles from '@/app/styles/components/screens/resultsLoadingScreen.module.css';
import EndScreen from './endScreen';
import bookGif from '@/public/images/book-gif.gif';
import {
    isUndergradDegreeStr,
    isGradDegreeStr,
    isGradCertDegreeStr
} from '@/app/utils/aptitudeQuestionScreen/typeGuards';

type ResultsLoadingScreenProps = {
    setScreen: Dispatch<SetStateAction<JSX.Element | null>>;
    degreePath: DegreePath;
    rspnsRecords: RspnsRecord[];
};

const sleep = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

const matchDegrees = (
    degreePath: DegreePath,
    rspnsRecords: RspnsRecord[]
): UndergradDegree | GradDegree | GradCertDegree => {
    if (degreePath === DegreePath.Undergraduate && rspnsRecords.length === 10) {
        const scoreObj = {
            [UndergradDegree.BaArtsDigitalComm]: 0,
            [UndergradDegree.BaSciSimAndGameDesign]: 0
        };
        for (const record of rspnsRecords) {
            if (record.usrRspns === 'skip' || !record.usrRspns) continue;
            if (record.usrRspns === 'yes') {
                for (const degreeStr of record.aptQstn
                    .positiveResponseDegrees) {
                    if (isUndergradDegreeStr(degreeStr)) scoreObj[degreeStr]++;
                }
                for (const degreeStr of record.aptQstn
                    .negativeResponseDegrees) {
                    if (isUndergradDegreeStr(degreeStr)) scoreObj[degreeStr]--;
                }
            } else {
                for (const degreeStr of record.aptQstn
                    .negativeResponseDegrees) {
                    if (isUndergradDegreeStr(degreeStr)) scoreObj[degreeStr]++;
                }
                for (const degreeStr of record.aptQstn
                    .positiveResponseDegrees) {
                    if (isUndergradDegreeStr(degreeStr)) scoreObj[degreeStr]--;
                }
            }
        }
        return scoreObj[UndergradDegree.BaArtsDigitalComm] >
            scoreObj[UndergradDegree.BaSciSimAndGameDesign]
            ? UndergradDegree.BaArtsDigitalComm
            : UndergradDegree.BaSciSimAndGameDesign;
    } else if (
        degreePath === DegreePath.Graduate &&
        rspnsRecords.length == 12
    ) {
        const scoreObj = {
            [GradDegree.MaArtsIntegDesign]: 0,
            [GradDegree.MaFineArtsIntegDesign]: 0,
            [GradDegree.MaSciInterDesignAndInfoArch]: 0,
            [GradDegree.DocSciInfoAndInterDesign]: 0
        };
        for (const record of rspnsRecords) {
            if (record.usrRspns === 'skip' || !record.usrRspns) continue;
            if (record.usrRspns === 'yes') {
                for (const degreeStr of record.aptQstn
                    .positiveResponseDegrees) {
                    if (isGradDegreeStr(degreeStr)) scoreObj[degreeStr]++;
                }
                for (const degreeStr of record.aptQstn
                    .negativeResponseDegrees) {
                    if (isGradDegreeStr(degreeStr)) scoreObj[degreeStr]--;
                }
            } else {
                for (const degreeStr of record.aptQstn
                    .negativeResponseDegrees) {
                    if (isGradDegreeStr(degreeStr)) scoreObj[degreeStr]++;
                }
                for (const degreeStr of record.aptQstn
                    .positiveResponseDegrees) {
                    if (isGradDegreeStr(degreeStr)) scoreObj[degreeStr]--;
                }
            }
        }
        const sortedScoreEntries = Object.entries(scoreObj).toSorted(
            (a, b) => b[1] - a[1]
        );
        return sortedScoreEntries[0][0] as GradDegree;
    }
    const scoreObj = {
        [GradCertDegree.CertDigitialComm]: 0,
        [GradCertDegree.CertUserExpDesign]: 0
    };
    for (const record of rspnsRecords) {
        if (record.usrRspns === 'skip' || !record.usrRspns) continue;
        if (record.usrRspns === 'yes') {
            for (const degreeStr of record.aptQstn.positiveResponseDegrees) {
                if (isGradCertDegreeStr(degreeStr)) scoreObj[degreeStr]++;
            }
            for (const degreeStr of record.aptQstn.negativeResponseDegrees) {
                if (isGradCertDegreeStr(degreeStr)) scoreObj[degreeStr]--;
            }
        } else {
            for (const degreeStr of record.aptQstn.negativeResponseDegrees) {
                if (isGradCertDegreeStr(degreeStr)) scoreObj[degreeStr]++;
            }
            for (const degreeStr of record.aptQstn.positiveResponseDegrees) {
                if (isGradCertDegreeStr(degreeStr)) scoreObj[degreeStr]--;
            }
        }
    }
    return scoreObj[GradCertDegree.CertDigitialComm] >
        scoreObj[GradCertDegree.CertUserExpDesign]
        ? GradCertDegree.CertDigitialComm
        : GradCertDegree.CertUserExpDesign;
};

export default function ResultsLoadingScreen({
    setScreen,
    degreePath,
    rspnsRecords
}: ResultsLoadingScreenProps) {
    useEffect(() => {
        const matchDegreeAndSetEndScreen = async () => {
            await sleep(3000);
            // setScreen(<EndScreen setScreen={setScreen} />);
            console.log(matchDegrees(degreePath, rspnsRecords));
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
