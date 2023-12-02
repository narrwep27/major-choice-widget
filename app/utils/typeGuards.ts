type UndergradDegreeStr =
    | 'bachelorOfArtsInDigitalCommunication'
    | 'bachelorOfScienceInSimulationAndGameDesign';

type GradDegreeStr =
    | 'masterOfArtsInIntegratedDesign'
    | 'masterOfFineArtsInIntegratedDesign'
    | 'masterOfScienceInInteractionDesignAndInformationArchitecture'
    | 'doctorOfScienceInInformationAndInteractionDesign';

type GradCertDegreeStr =
    | 'certificateInDigitalCommunication'
    | 'certificateInUserExperienceDesign';

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
