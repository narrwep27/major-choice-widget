import { UndergradDegree, GradDegree, GradCertDegree } from '@/app/enums';
import {
    UndergradDegreeStrArr,
    GradDegreeStrArr,
    GradCertDegreeStrArr
} from './types';

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
