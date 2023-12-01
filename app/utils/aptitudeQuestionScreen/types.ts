import { Dispatch, SetStateAction } from 'react';
import { DegreePath } from '@/app/enums';

export type AptitudeQuestionScreenProps = {
    degreePath: DegreePath;
    setScreen: Dispatch<SetStateAction<JSX.Element | null>>;
};

export type AptitudeQstn = {
    question: string;
    positiveResponseDegrees: string[];
    negativeResponseDegrees: string[];
};

export type QstnObjState = {
    qstnInd: number;
    currQstn: string;
};

export type RspnsRecord = {
    aptQstn: AptitudeQstn;
    qstnInd: number;
    usrRspns: 'yes' | 'no' | 'skip' | null;
};

export type UndergradDegreeStrArr = (
    | 'bachelorOfArtsInDigitalCommunication'
    | 'bachelorOfScienceInSimulationAndGameDesign'
)[];

export type GradDegreeStrArr = (
    | 'masterOfArtsInIntegratedDesign'
    | 'masterOfFineArtsInIntegratedDesign'
    | 'masterOfScienceInInteractionDesignAndInformationArchitecture'
    | 'doctorOfScienceInInformationAndInteractionDesign'
)[];

export type GradCertDegreeStrArr = (
    | 'certificateInDigitalCommunication'
    | 'certificateInUserExperienceDesign'
)[];
