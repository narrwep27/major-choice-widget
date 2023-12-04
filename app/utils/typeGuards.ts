import { UndergradDegree, GradDegree, GradCertDegree } from '../enums';

// type UndergradDegreeStr =
//     | 'bachelorOfArtsInDigitalCommunication'
//     | 'bachelorOfScienceInSimulationAndGameDesign';

// type GradDegreeStr =
//     | 'masterOfArtsInIntegratedDesign'
//     | 'masterOfFineArtsInIntegratedDesign'
//     | 'masterOfScienceInInteractionDesignAndInformationArchitecture'
//     | 'doctorOfScienceInInformationAndInteractionDesign';

// type GradCertDegreeStr =
//     | 'certificateInDigitalCommunication'
//     | 'certificateInUserExperienceDesign';

// const isUndergradDegreeStr = (str: string): str is UndergradDegreeStr =>
//     str === 'bachelorOfArtsInDigitalCommunication' ||
//     str === 'bachelorOfScienceInSimulationAndGameDesign';

// const isGradDegreeStr = (str: string): str is GradDegreeStr =>
//     str === 'masterOfArtsInIntegratedDesign' ||
//     str === 'masterOfFineArtsInIntegratedDesign' ||
//     str === 'masterOfScienceInInteractionDesignAndInformationArchitecture' ||
//     str === 'doctorOfScienceInInformationAndInteractionDesign';

// const isGradCertDegreeStr = (str: string): str is GradCertDegreeStr =>
//     str === 'certificateInDigitalCommunication' ||
//     str === 'certificateInUserExperienceDesign';

export type UndergradScoreObj = {
    [UndergradDegree.BaArtsDigitalComm]: number;
    [UndergradDegree.BaSciSimAndGameDesign]: number;
};
export type GradScoreObj = {
    [GradDegree.MaArtsIntegDesign]: number;
    [GradDegree.MaFineArtsIntegDesign]: number;
    [GradDegree.MaSciInterDesignAndInfoArch]: number;
    [GradDegree.DocSciInfoAndInterDesign]: number;
};
export type GradCertScoreObj = {
    [GradCertDegree.CertDigitialComm]: number;
    [GradCertDegree.CertUserExpDesign]: number;
};

export const isUndergradScoreObj = (
    scoreObj: UndergradScoreObj | GradScoreObj | GradCertScoreObj
): scoreObj is UndergradScoreObj =>
    Object.hasOwn(scoreObj, UndergradDegree.BaArtsDigitalComm) &&
    Object.hasOwn(scoreObj, UndergradDegree.BaSciSimAndGameDesign);

export const isGradScoreObj = (
    scoreObj: UndergradScoreObj | GradScoreObj | GradCertScoreObj
): scoreObj is GradScoreObj =>
    Object.hasOwn(scoreObj, GradDegree.MaArtsIntegDesign) &&
    Object.hasOwn(scoreObj, GradDegree.MaFineArtsIntegDesign) &&
    Object.hasOwn(scoreObj, GradDegree.MaSciInterDesignAndInfoArch) &&
    Object.hasOwn(scoreObj, GradDegree.DocSciInfoAndInterDesign);

export const isGradCertScoreObj = (
    scoreObj: UndergradScoreObj | GradScoreObj | GradCertScoreObj
): scoreObj is GradCertScoreObj =>
    Object.hasOwn(scoreObj, GradCertDegree.CertDigitialComm) &&
    Object.hasOwn(scoreObj, GradCertDegree.CertUserExpDesign);
