import Image from 'next/image'
import styles from './page.module.css'
import SelectFocusArea from '@/components/SelectFocusArea'

export default function Home() {
  return (
    <main className={styles.main}>
      <SelectFocusArea/>
    </main>
  )
}
