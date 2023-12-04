import { DegreePath } from '@/app/enums';
import { RspnsRecord } from '@/app/components/screens/aptitudeQuestionScreen';
import { UndergradDegree, GradDegree, GradCertDegree } from '@/app/enums';
import {
    isUndergradScoreObj,
    isGradScoreObj,
    isGradCertScoreObj,
    UndergradScoreObj,
    GradScoreObj,
    GradCertScoreObj
} from './typeGuards';

export const getReadableDegreeName = (degreePath: DegreePath): string => {
    if (degreePath === DegreePath.Undergraduate) return 'Undergraduate';
    if (degreePath === DegreePath.Graduate) return 'Graduate';
    return 'Graduate Certificate';
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

export const countDegreeScoresAndGroup = (
    degreePath: DegreePath,
    rspnsRecords: RspnsRecord[]
): {
    [key: number]: (UndergradDegree | GradDegree | GradCertDegree)[];
} => {
    if (degreePath === DegreePath.Undergraduate && rspnsRecords.length === 10) {
        const scoreObj = countScoresIntoScoresObj(
            UndergradDegree,
            rspnsRecords
        );
        return groupDegreesByScore(scoreObj);
    } else if (
        degreePath === DegreePath.Graduate &&
        rspnsRecords.length == 12
    ) {
        const scoreObj = countScoresIntoScoresObj(GradDegree, rspnsRecords);
        return groupDegreesByScore(scoreObj);
    } else if (
        degreePath === DegreePath.GraduateCertificate &&
        rspnsRecords.length === 8
    ) {
        const scoreObj = countScoresIntoScoresObj(GradCertDegree, rspnsRecords);
        return groupDegreesByScore(scoreObj);
    }
    throw new Error(
        "The 'degreePath' arg must be paired with a 'rspnsRecords' arg of a certain length."
    );
};

const countScoresIntoScoresObj = (
    degreeType:
        | typeof UndergradDegree
        | typeof GradDegree
        | typeof GradCertDegree,
    rspnsRecords: RspnsRecord[]
): UndergradScoreObj | GradScoreObj | GradCertScoreObj => {
    let scoreObj: UndergradScoreObj | GradScoreObj | GradCertScoreObj;
    if (degreeType === UndergradDegree) {
        scoreObj = {
            [UndergradDegree.BaArtsDigitalComm]: 0,
            [UndergradDegree.BaSciSimAndGameDesign]: 0
        };
    } else if (degreeType === GradDegree) {
        scoreObj = {
            [GradDegree.MaArtsIntegDesign]: 0,
            [GradDegree.MaFineArtsIntegDesign]: 0,
            [GradDegree.MaSciInterDesignAndInfoArch]: 0,
            [GradDegree.DocSciInfoAndInterDesign]: 0
        };
    } else {
        scoreObj = {
            [GradCertDegree.CertDigitialComm]: 0,
            [GradCertDegree.CertUserExpDesign]: 0
        };
    }
    for (const record of rspnsRecords) {
        if (record.usrRspns === 'skip' || !record.usrRspns) continue;
        if (record.usrRspns === 'yes') {
            for (const degreeStr of record.aptQstn.positiveResponseDegrees)
                scoreObj[degreeStr as keyof typeof degreeType]++;
            for (const degreeStr of record.aptQstn.negativeResponseDegrees)
                scoreObj[degreeStr as keyof typeof degreeType]--;
        } else {
            for (const degreeStr of record.aptQstn.positiveResponseDegrees)
                scoreObj[degreeStr as keyof typeof degreeType]--;
            for (const degreeStr of record.aptQstn.negativeResponseDegrees) {
                scoreObj[degreeStr as keyof typeof degreeType]++;
            }
        }
    }

    return scoreObj;
};

const groupDegreesByScore = (
    degreeScoreObj: UndergradScoreObj | GradScoreObj | GradCertScoreObj
): {
    [key: number]: (UndergradDegree | GradDegree | GradCertDegree)[];
} => {
    if (isUndergradScoreObj(degreeScoreObj))
        return createGroupedDegreeObj<UndergradDegree>(degreeScoreObj);
    if (isGradScoreObj(degreeScoreObj))
        return createGroupedDegreeObj<GradDegree>(degreeScoreObj);
    return createGroupedDegreeObj<GradCertDegree>(degreeScoreObj);
};

const createGroupedDegreeObj = <
    DegreeT extends UndergradDegree | GradDegree | GradCertDegree
>(
    degreeScoreObj: UndergradScoreObj | GradScoreObj | GradCertScoreObj
): {
    [key: number]: DegreeT[];
} => {
    const degreesGroupedByScore: {
        [key: number]: DegreeT[];
    } = {};
    for (const entry of Object.entries(degreeScoreObj)) {
        if (!Object.hasOwn(degreesGroupedByScore, entry[1])) {
            degreesGroupedByScore[entry[1]] = [entry[0] as DegreeT];
            continue;
        }
        degreesGroupedByScore[entry[1]].push(entry[0] as DegreeT);
    }
    return degreesGroupedByScore;
};
