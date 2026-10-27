import styles from '../page.module.css';
import { Reveal } from './Reveal';
import { FeeStat } from './FeeStat';

const STATS = [
  { num: 'EVM', label: 'Shanghai-equivalent' },
  { num: 'SP1', label: 'Proven state' },
];

export function StatBand() {
  return (
    <div className={styles.shell}>
      <Reveal as="div" className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statNum}>131071</div>
          <div className={styles.statLabel}>Chain ID · 2¹⁷−1</div>
        </div>
        <FeeStat />
        {STATS.map((s) => (
          <div key={s.label} className={styles.stat}>
            <div className={styles.statNum}>{s.num}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
