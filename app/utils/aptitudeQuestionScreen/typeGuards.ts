import { UndergradDegreeStr, GradDegreeStr, GradCertDegreeStr } from './types';

export const isUndergradDegreeStr = (str: string): str is UndergradDegreeStr =>
    str === 'bachelorOfArtsInDigitalCommunication' ||
    str === 'bachelorOfScienceInSimulationAndGameDesign';

export const isGradDegreeStr = (str: string): str is GradDegreeStr =>
    str === 'masterOfArtsInIntegratedDesign' ||
    str === 'masterOfFineArtsInIntegratedDesign' ||
    str === 'masterOfScienceInInteractionDesignAndInformationArchitecture' ||
    str === 'doctorOfScienceInInformationAndInteractionDesign';

export const isGradCertDegreeStr = (str: string): str is GradCertDegreeStr =>
    str === 'certificateInDigitalCommunication' ||
    str === 'certificateInUserExperienceDesign';
