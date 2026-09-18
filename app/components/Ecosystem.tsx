import styles from '../page.module.css';
import { Reveal } from './Reveal';
import { SITE, LINKS } from '../site';

const ECOSYSTEM = [
  {
    name: 'Mersennet Trade',
    status: 'Live',
    desc: 'Perpetuals terminal on the native order book (the MersennetOrders precompile at 0x…0100).',
    href: LINKS.trade,
  },
  {
    name: 'Mersennet Explorer',
    status: 'Live',
    desc: 'Privacy-aware block explorer with ZK proof verification.',
    href: LINKS.explorer,
  },
  {
    name: 'Mersennet Faucet',
    status: 'Live',
    desc: 'Testnet MRSN for development and testing.',
    href: LINKS.faucet,
  },
  {
    name: 'Staking & Validators',
    status: 'Live',
    desc: 'Delegate MRSN or register your node as a validator — the set is open.',
    href: LINKS.staking,
  },
  {
    name: 'Points',
    status: 'Live',
    desc: 'Season 1: 1 point per $1 traded, 500 a day for a verified node.',
    href: LINKS.points,
  },
  {
    name: 'Downloads',
    status: 'Live',
    desc: 'Signed node releases, installer and state snapshots.',
    href: LINKS.downloads,
  },
  {
    name: 'Status',
    status: 'Live',
    desc: 'Live uptime of RPC, explorer, faucet, terminal and snapshots.',
    href: LINKS.statusPage,
  },
  {
    name: 'Maker Vault',
    status: 'Live',
    desc: 'Pool MRSN behind the market maker; shares track its PnL and earn LP points. Deposits open Sun 20 Sep.',
    href: LINKS.vault,
  },
  { name: 'Shielded Pool', status: 'At the fork', desc: 'Root anchored in every block today; private deposits, transfers and orders switch on at the privacy hard fork.' },
  { name: 'Private Lending', status: 'Soon', desc: 'Private lending & borrowing markets.' },
];

export function Ecosystem() {
  return (
    <section className={styles.shell} id="ecosystem">
      <div className={styles.section}>
        <Reveal as="header" className={styles.secHead}>
          <span className={styles.secIndex}>[ 09 ] // Ecosystem</span>
          <h2 className={styles.secTitle}>Everything you need, already on testnet.</h2>
          <p className={styles.secLead}>
            Order-book trading, staking, points, node releases and tooling are live on the{' '}
            {SITE.name} testnet today; the shielded pool switches on at the privacy hard fork.
          </p>
        </Reveal>
        <div className={styles.eco}>
          {ECOSYSTEM.map((e, i) => (
            <Reveal as="div" key={e.name} delay={i * 50} className={styles.ecoCard}>
              <div className={styles.ecoHead}>
                {'href' in e && e.href ? (
                  <a
                    className={styles.ecoName}
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {e.name}
                  </a>
                ) : (
                  <span className={styles.ecoName}>{e.name}</span>
                )}
                <span
                  className={`${styles.badge} ${
                    e.status === 'Live' ? styles.badgeLive : styles.badgeSoon
                  }`}
                >
                  {e.status}
                </span>
              </div>
              <p className={styles.ecoDesc}>{e.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
