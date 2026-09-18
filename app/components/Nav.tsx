import styles from '../page.module.css';
import { LINKS, SITE } from '../site';
import { BrandMark } from './Icon';

const NAV = [
  { n: '1.0', label: 'Docs', href: LINKS.docs },
  { n: '2.0', label: 'Thesis', href: '#thesis' },
  { n: '3.0', label: 'Edge', href: '#edge' },
  { n: '4.0', label: 'Build', href: '#build' },
  { n: '5.0', label: 'Verify', href: '#verifiable' },
  { n: '6.0', label: 'Nodes', href: '#operate' },
  { n: '7.0', label: 'Trade', href: LINKS.trade },
  { n: '8.0', label: 'GitHub', href: LINKS.github },
];

export function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <a className={styles.brand} href="/" aria-label={`${SITE.name} home`}>
          <span className={styles.brandMark}>
            <BrandMark size={22} flat />
          </span>
          {SITE.name}
        </a>

        <div className={`${styles.navLinks} ${styles.navHideMobile}`}>
          {NAV.map((item) => (
            <a
              key={item.label}
              className={styles.navLink}
              href={item.href}
              {...(item.href.startsWith('http')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              <i>{item.n}</i>
              {item.label}
            </a>
          ))}
        </div>

        <div className={styles.navMeta}>
          <span className={`${styles.navStat} ${styles.navHideMobile}`}>
            CHAIN <b>{SITE.chainId}</b>
          </span>
          <span className={`${styles.navStat} ${styles.navHideMobile}`}>
            BLOCK <b>{SITE.blockTime}</b>
          </span>
          <span className={styles.navPill}>
            <span className={styles.navDot} />
            Testnet
          </span>
          {/* Phone menu: a <details> drawer — no client JS on a static export,
              works with the keyboard, and the section links were otherwise
              unreachable under 900px (the header collapsed to the brand). */}
          <details className={styles.navDrawer}>
            <summary className={styles.navBurger} aria-label="Open menu">
              <span /><span /><span />
            </summary>
            <div className={styles.navDrawerPanel}>
              <a className={styles.navDrawerCta} href={LINKS.trade} target="_blank" rel="noopener noreferrer">Open the terminal ↗</a>
              <a className={styles.navDrawerCta} href={LINKS.faucet} target="_blank" rel="noopener noreferrer">Claim testnet MRSN ↗</a>
              {NAV.map((item) => (
                <a
                  key={item.label}
                  className={styles.navDrawerLink}
                  href={item.href}
                  {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <i>{item.n}</i>
                  {item.label}
                </a>
              ))}
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
}
