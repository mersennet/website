import styles from '../page.module.css';
import { Reveal } from './Reveal';

const PHASES = [
  {
    tag: 'SHIPPED',
    title: 'The chain is built',
    live: true,
    items: [
      '~44K lines of Rust · 300+ tests green',
      'Public testnet live: dual RPC with failover, faucet, explorer, trade terminal, status page',
      'Parallel EVM + native CLOB + shielded accounts',
      'Open validator set: register with 1,000 MRSN, hourly epochs, jailing without slashing',
      'One-command node install from signed releases · snapshot bootstrap in ~1 minute',
      'Fork choice by finality · verified node runners earn points',
      'Agent keys for one-click trading · $0.01 ticks · keeper liquidations, PnL settlement and a pooled maker vault (switching on 19–20 Sep)',
      'SDKs in TypeScript, Python, Go',
    ],
  },
  {
    tag: 'IN FLIGHT',
    title: 'Proofs go production',
    live: false,
    items: [
      'Groth16 verifying key for the Ethereum bridge',
      'Third-party security audit',
      'Real-prover lane (SP1 + Barretenberg) in CI',
    ],
  },
  {
    tag: 'NEXT',
    title: 'Mainnet & MRSN',
    live: false,
    items: [
      'Genesis ceremony · 7+ independent validators (set already opening on testnet)',
      'MRSN token generation, fixed supply 2⁸⁹−1',
      'Block reward 2.3 MRSN · halving every 33,550,336 blocks (5th perfect number)',
      'Privacy hard fork activated by governance',
    ],
  },
];

export function Momentum() {
  return (
    <section className={styles.shell} id="momentum">
      <div className={styles.section}>
        <Reveal as="header" className={styles.secHead}>
          <span className={styles.secIndex}>[ 08 ] // Momentum</span>
          <h2 className={styles.secTitle}>Most of the risk is already retired.</h2>
          <p className={styles.secLead}>
            This is not a whitepaper project. The execution engine, the order book, the
            shielded state machine, and the proof pipeline exist today as working,
            tested, open code you can run.
          </p>
        </Reveal>
        <div className={styles.phases}>
          {PHASES.map((p, i) => (
            <Reveal as="article" key={p.tag} delay={i * 90} className={`${styles.hud} ${styles.phase}`}>
              <div className={styles.phaseHead}>
                <span className={p.live ? styles.phaseTagLive : styles.phaseTag}>{p.tag}</span>
                {p.live ? <span className={styles.phaseDot} aria-hidden="true" /> : null}
              </div>
              <h3 className={styles.phaseTitle}>{p.title}</h3>
              <ul className={styles.phaseList}>
                {p.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
