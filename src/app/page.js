import Image from 'next/image';
import styles from './page.module.css';
import SelectFocusArea from '@/components/SelectFocusArea';
import Calendar from '@/components/Calendar';

export default function Home() {
  return (
    <main className={styles.main}>
      <Calendar />
      <SelectFocusArea />
    </main>
  );
}
