import styles from '../page.module.css';
import { LINKS, SITE } from '../site';
import { ArrowRight } from './Icon';
import { Reveal } from './Reveal';

export function CtaBand() {
  return (
    <div className={styles.ctaWrap}>
      <Reveal as="div" className={`${styles.hud} ${styles.cta}`}>
        <h2 className={styles.ctaTitle}>Build on it. Trade on it. Run it.</h2>
        <p className={styles.ctaText}>
          Deploy a contract, claim testnet {SITE.symbol}, trade on the native order book — or
          run a node in one command and register it as a validator. Every part of the network
          is open to test.
        </p>
        <div className={styles.ctaBtns}>
          <a className={`${styles.btn} ${styles.btnPrimary}`} href={LINKS.quickStart}>
            Start building
            <ArrowRight />
          </a>
          <a
            className={`${styles.btn} ${styles.btnGhost}`}
            href={LINKS.faucet}
            target="_blank"
            rel="noopener noreferrer"
          >
            Claim testnet {SITE.symbol}
          </a>
          <a
            className={`${styles.btn} ${styles.btnGhost}`}
            href={LINKS.runNode}
            target="_blank"
            rel="noopener noreferrer"
          >
            Run a node
          </a>
        </div>
      </Reveal>
    </div>
  );
}
