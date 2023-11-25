import { DegreeType } from './components/ui/degreeChoiceBtn';

export function GetDegreeTypeClassName(degreeType: DegreeType): string {
    if (degreeType === DegreeType.UNDERGRADUATE) {
        return 'undergraduate';
    } else if (degreeType === DegreeType.GRADUATE) {
        return 'graduate';
    } else if (degreeType === DegreeType.GRADUATE_CERTIFICATE) {
        return 'graduateCertificate';
    }
    return 'none';
}
