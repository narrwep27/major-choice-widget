'use client';

import styles from './styles/page.module.css';
import DegreeChoiceScreen from './components/degreeChoiceScreen';
import { JSX, useState } from 'react';

export default function HomePage() {
    const [screen, setScreen] = useState<JSX.Element | null>(null);

    return (
        <div className={styles.container}>
            {!screen ? (
                <div className={styles.widget}>
                    <div className={styles.widget_content}>
                        <div className={styles.widget_header_div}>
                            <h2>What's the right</h2>
                            <h2>degree program for you?</h2>
                        </div>
                        <div className={styles.widget_para_div}>
                            <p>Take the quiz to find out what</p>
                            <p>program is right for you.</p>
                        </div>
                        <button onClick={() => setScreen(DegreeChoiceScreen)}>
                            START
                        </button>
                    </div>
                </div>
            ) : (
                <DegreeChoiceScreen />
            )}
        </div>
    );
}
