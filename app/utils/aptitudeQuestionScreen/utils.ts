import {
    UndergradDegree,
    GradDegree,
    GradCertDegree,
    DegreePath
} from '@/app/enums';
import {
    UndergradScoreState,
    GradScoreState,
    GradCertScoreState,
    UndergradDegreeStrArr,
    GradDegreeStrArr,
    GradCertDegreeStrArr
} from './types';
import {
    isUndergradScoreState,
    isGradScoreState,
    isGradCertScoreState,
    isUndergradDegreeStrArr,
    isGradDegreeStrArr,
    isGradCertDegreeStrArr
} from './typeGuards';

export const getReadableDegreeName = (degreePath: DegreePath): string => {
    if (degreePath === DegreePath.Undergraduate) return 'Undergraduate';
    if (degreePath === DegreePath.Graduate) return 'Graduate';
    if (degreePath === DegreePath.GraduateCertificate)
        return 'Graduate Certificate';
    return 'None';
};

export const getNewScoreObj = (
    currScoresObj: UndergradScoreState | GradScoreState | GradCertScoreState,
    incrementedDegrees: string[],
    decrementedDegrees: string[]
): UndergradScoreState | GradScoreState | GradCertScoreState | null => {
    const newScoresObj:
        | UndergradScoreState
        | GradScoreState
        | GradCertScoreState = structuredClone(currScoresObj);
    if (
        isUndergradScoreState(currScoresObj) &&
        isUndergradScoreState(newScoresObj) &&
        isUndergradDegreeStrArr(incrementedDegrees) &&
        isUndergradDegreeStrArr(decrementedDegrees)
    ) {
        for (const degreeStr of incrementedDegrees) {
            newScoresObj[degreeStr as UndergradDegree]++;
        }
        for (const degreeStr of decrementedDegrees)
            newScoresObj[degreeStr as UndergradDegree]--;
    } else if (
        isGradScoreState(currScoresObj) &&
        isGradScoreState(newScoresObj) &&
        isGradDegreeStrArr(incrementedDegrees) &&
        isGradDegreeStrArr(decrementedDegrees)
    ) {
        for (const degreeStr of incrementedDegrees)
            newScoresObj[degreeStr as GradDegree]++;
        for (const degreeStr of decrementedDegrees)
            newScoresObj[degreeStr as GradDegree]--;
    } else if (
        isGradCertScoreState(currScoresObj) &&
        isGradCertScoreState(newScoresObj) &&
        isGradCertDegreeStrArr(incrementedDegrees) &&
        isGradCertDegreeStrArr(decrementedDegrees)
    ) {
        for (const degreeStr of incrementedDegrees)
            newScoresObj[degreeStr as GradCertDegree]++;
        for (const degreeStr of decrementedDegrees)
            newScoresObj[degreeStr as GradCertDegree]--;
    } else {
        return null;
    }

    return newScoresObj;
};
