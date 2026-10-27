'use client';

import { useEffect, useState } from 'react';
import styles from '../page.module.css';
import { LINKS } from '../site';

const FEES_URL = 'https://trade.mersennet.com/api/v1/stats/fees';
const FLOOR_MRSN = 0.000021; // a 21,000-gas transfer at the 1 gwei floor

type Transfer = { mrsn: number; usd: number | null };

export function FeeStat() {
  const [fee, setFee] = useState<Transfer>({ mrsn: FLOOR_MRSN, usd: null });
  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch(FEES_URL)
        .then((r) => r.json())
        .then((f) => {
          const t = f.actions?.find((a: { key: string }) => a.key === 'transfer');
          if (alive && t) setFee({ mrsn: t.mrsn, usd: t.usd });
        })
        .catch(() => {});
    load();
    const id = setInterval(load, 60_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);
  const mrsn = String(+fee.mrsn.toPrecision(2));
  return (
    <a
      className={styles.stat}
      href={`${LINKS.networkInfo}#network-fees`}
      target="_blank"
      rel="noopener noreferrer"
      title="At the price on the testnet's MRSN/USD market"
    >
      <div className={styles.statNum}>{fee.usd != null ? `$${fee.usd.toFixed(4)}` : mrsn}</div>
      <div className={styles.statLabel}>
        {fee.usd != null ? `Transfer fee · ${mrsn} MRSN` : 'MRSN per transfer'}
      </div>
    </a>
  );
}
