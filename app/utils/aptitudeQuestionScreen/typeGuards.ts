import { UndergradDegree, GradDegree, GradCertDegree } from '@/app/enums';
import {
    UndergradScoreState,
    GradScoreState,
    GradCertScoreState,
    UndergradDegreeStrArr,
    GradDegreeStrArr,
    GradCertDegreeStrArr
} from './types';

export const isUndergradScoreState = (
    scoresObj: UndergradScoreState | GradScoreState | GradCertScoreState | null
): scoresObj is UndergradScoreState => {
    return (
        scoresObj != null &&
        UndergradDegree.BaArtsDigitalComm in scoresObj &&
        UndergradDegree.BaSciSimAndGameDesign in scoresObj
    );
};

export const isGradScoreState = (
    scoresObj: UndergradScoreState | GradScoreState | GradCertScoreState | null
): scoresObj is GradScoreState => {
    return (
        scoresObj != null &&
        GradDegree.MaArtsIntegDesign in scoresObj &&
        GradDegree.MaFineArtsIntegDesign in scoresObj &&
        GradDegree.MaSciInterDesignAndInfoArch in scoresObj &&
        GradDegree.DocSciInfoAndInterDesign in scoresObj
    );
};

export const isGradCertScoreState = (
    scoresObj: UndergradScoreState | GradScoreState | GradCertScoreState | null
): scoresObj is GradCertScoreState => {
    return (
        scoresObj != null &&
        GradCertDegree.CertDigitialComm in scoresObj &&
        GradCertDegree.CertUserExpDesign in scoresObj
    );
};

export const isUndergradDegreeStrArr = (
    strArr: string[]
): strArr is UndergradDegreeStrArr => {
    return strArr.every(
        (str) =>
            str === 'bachelorOfArtsInDigitalCommunication' ||
            str === 'bachelorOfScienceInSimulationAndGameDesign'
    );
};

export const isGradDegreeStrArr = (
    strArr: string[]
): strArr is GradDegreeStrArr => {
    return strArr.every(
        (str) =>
            str === 'masterOfArtsInIntegratedDesign' ||
            str === 'masterOfFineArtsInIntegratedDesign' ||
            str ===
                'masterOfScienceInInteractionDesignAndInformationArchitecture' ||
            str === 'doctorOfScienceInInformationAndInteractionDesign'
    );
};

export const isGradCertDegreeStrArr = (
    strArr: string[]
): strArr is GradCertDegreeStrArr => {
    return strArr.every(
        (str) =>
            str === 'certificateInDigitalCommunication' ||
            str === 'certificateInUserExperienceDesign'
    );
};
