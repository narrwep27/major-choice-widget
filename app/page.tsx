import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.widget}>
                <h2>What's the right</h2>
                <h2>degree program for you?</h2>
                <p>Take the quiz to find out what</p>
                <p>program is right for you.</p>
                <button>Start</button>
                <Image
                    className={styles.widget_background}
                    src="/static/home-screen.png"
                    fill={true}
                    alt="Home page background"
                />
            </div>
        </main>
    );
}
