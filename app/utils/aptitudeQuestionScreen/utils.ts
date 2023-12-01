import { DegreePath } from '@/app/enums';
import { RspnsRecord } from './types';

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
