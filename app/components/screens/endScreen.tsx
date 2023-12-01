import { Dispatch, SetStateAction } from 'react';
import styles from '@/app/styles/components/screens/endScreen.module.css';

type EndScreenProps = {
    setScreen: Dispatch<SetStateAction<JSX.Element | null>>;
};

export default function EndScreen({ setScreen }: EndScreenProps) {
    return <div className={styles.end_screen_div}>End Screen</div>;
}
