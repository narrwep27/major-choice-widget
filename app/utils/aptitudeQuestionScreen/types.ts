import { Dispatch, SetStateAction } from 'react';
import {
    DegreePath,
    UndergradDegree,
    GradDegree,
    GradCertDegree
} from '@/app/enums';

export type AptitudeQuestionScreenProps = {
    degreePath: DegreePath;
    setScreen: Dispatch<SetStateAction<JSX.Element | null>>;
};

export type AptitudeQuestion = {
    question: string;
    positiveResponseDegrees: string[];
    negativeResponseDegrees: string[];
};

export type QstnObjState = {
    qstnInd: number;
    currQstn: string;
    positiveResponseDegrees: string[];
    negativeResponseDegrees: string[];
};

export type QstnHstry = {
    qstnInd: number;
    qstn: string;
    userRspns: boolean | null;
};

export type UndergradScoreState = {
    [UndergradDegree.BaArtsDigitalComm]: number;
    [UndergradDegree.BaSciSimAndGameDesign]: number;
};

export type GradScoreState = {
    [GradDegree.MaArtsIntegDesign]: number;
    [GradDegree.MaFineArtsIntegDesign]: number;
    [GradDegree.MaSciInterDesignAndInfoArch]: number;
    [GradDegree.DocSciInfoAndInterDesign]: number;
};

export type GradCertScoreState = {
    [GradCertDegree.CertDigitialComm]: number;
    [GradCertDegree.CertUserExpDesign]: number;
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
