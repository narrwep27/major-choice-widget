import { DegreePath } from '@/app/enums';
import { RspnsRecord } from '@/app/components/screens/aptitudeQuestionScreen';
import { UndergradDegree, GradDegree, GradCertDegree } from '@/app/enums';
import {
    isUndergradDegreeStr,
    isGradDegreeStr,
    isGradCertDegreeStr
} from './typeGuards';

export const getReadableDegreeName = (degreePath: DegreePath): string => {
    if (degreePath === DegreePath.Undergraduate) return 'Undergraduate';
    if (degreePath === DegreePath.Graduate) return 'Graduate';
    if (degreePath === DegreePath.GraduateCertificate)
        return 'Graduate Certificate';
    return 'None';
};

export const createNewRspnsHstryArr = (
    fromArray: RspnsRecord[],
    rspns: 'yes' | 'no' | 'skip' | null,
    indToUpdate: number
): RspnsRecord[] => {
    const newRspnsHstryArr: RspnsRecord[] = Array.from(fromArray);
    newRspnsHstryArr[indToUpdate] = {
        aptQstn: newRspnsHstryArr[indToUpdate].aptQstn,
        qstnInd: indToUpdate,
        usrRspns: rspns
    };
    return newRspnsHstryArr;
};

export const sleep = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const matchDegrees = (
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
