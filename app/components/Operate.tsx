'use client';

import { useEffect, useState } from 'react';
import styles from '../page.module.css';
import { Reveal } from './Reveal';
import { LINKS, SITE } from '../site';

// Live network figures from the public RPC and the terminal API. Rendered
// client-side so the static export stays static; falls back to dashes.
type Stats = {
  height: number | null;
  peers: number | null;
  validators: number | null;
  setOpen: boolean | null;
  activationHeight: number | null;
  verifiedNodes: number | null;
};

const RPC = 'https://rpc.mersennet.com';

async function rpc<T>(method: string): Promise<T | null> {
  try {
    const res = await fetch(RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params: [] }),
    });
    const j = await res.json();
    return (j.result ?? null) as T | null;
  } catch {
    return null;
  }
}

function useNetworkStats(): Stats {
  const [stats, setStats] = useState<Stats>({
    height: null,
    peers: null,
    validators: null,
    setOpen: null,
    activationHeight: null,
    verifiedNodes: null,
  });
  useEffect(() => {
    let alive = true;
    const load = async () => {
      const [heightHex, peers, vset, verified] = await Promise.all([
        rpc<string>('eth_blockNumber'),
        rpc<{ heard: boolean }[]>('mersennet_peers'),
        rpc<{ active: boolean; params: { activationHeight: number }; consensusValidators: string[] }>('mersennet_validatorSet'),
        fetch('https://trade.mersennet.com/api/v1/nodes/verified').then((r) => r.json()).catch(() => null),
      ]);
      if (!alive) return;
      setStats({
        height: heightHex ? parseInt(heightHex, 16) : null,
        peers: Array.isArray(peers) ? peers.filter((p) => p.heard).length : null,
        validators: vset ? vset.consensusValidators.length : null,
        setOpen: vset ? vset.active : null,
        activationHeight: vset ? vset.params.activationHeight : null,
        verifiedNodes: verified && typeof verified.active === 'number' ? verified.active : null,
      });
    };
    load();
    const t = setInterval(load, 15_000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);
  return stats;
}

function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className={styles.opCmd}>
      <code>{command}</code>
      <button
        type="button"
        className={styles.opCopy}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(command);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          } catch {
            /* clipboard unavailable */
          }
        }}
        aria-label="Copy install command"
      >
        {copied ? 'copied' : 'copy'}
      </button>
    </div>
  );
}

const fmt = (n: number | null) => (n == null ? '—' : n.toLocaleString('en-US'));

export function Operate() {
  const s = useNetworkStats();
  const setLabel =
    s.setOpen == null
      ? 'Validator set'
      : s.setOpen
        ? 'Validators · open set'
        : `Validators · opens at ${fmt(s.activationHeight)}`;

  return (
    <section className={styles.shell} id="operate">
      <div className={styles.section}>
        <Reveal as="header" className={styles.secHead}>
          <span className={styles.secIndex}>[ 10 ] // Operate the network</span>
          <h2 className={styles.secTitle}>Run it. Validate it. Get paid in points.</h2>
          <p className={styles.secLead}>
            A public testnet where every part is yours to test: a node in one command, a
            validator seat for 1,000 {SITE.symbol}, and daily points for keeping it online.
          </p>
        </Reveal>

        <Reveal as="div" className={styles.opStats}>
          <div className={styles.opStat}>
            <div className={styles.opStatNum}>{fmt(s.height)}</div>
            <div className={styles.opStatLabel}>Block height</div>
          </div>
          <div className={styles.opStat}>
            <div className={styles.opStatNum}>{fmt(s.validators)}</div>
            <div className={styles.opStatLabel}>{setLabel}</div>
          </div>
          <div className={styles.opStat}>
            <div className={styles.opStatNum}>{fmt(s.peers)}</div>
            <div className={styles.opStatLabel}>Nodes gossiping with the public node</div>
          </div>
          <div className={styles.opStat}>
            <div className={styles.opStatNum}>{fmt(s.verifiedNodes)}</div>
            <div className={styles.opStatLabel}>Verified node runners online</div>
          </div>
        </Reveal>

        <div className={styles.eco}>
          <Reveal as="article" className={`${styles.ecoCard} ${styles.opCard}`}>
            <div className={styles.ecoHead}>
              <span className={styles.ecoName}>Run a node</span>
              <span className={`${styles.badge} ${styles.badgeLive}`}>~1 min</span>
            </div>
            <p className={styles.ecoDesc}>
              One command on any Ubuntu 22.04+ / Debian 12+ server. The installer verifies the
              signed release, restores a state snapshot and starts a hardened systemd service —
              your node is in sync in about a minute.
            </p>
            <CopyCommand command={LINKS.installOneLiner} />
            <div className={styles.opLinks}>
              <a className={`${styles.btn} ${styles.btnSm}`} href={LINKS.runNode} target="_blank" rel="noopener noreferrer">
                Guide →
              </a>
              <a className={`${styles.btn} ${styles.btnSm}`} href={LINKS.downloads} target="_blank" rel="noopener noreferrer">
                Downloads
              </a>
            </div>
          </Reveal>

          <Reveal as="article" delay={60} className={`${styles.ecoCard} ${styles.opCard}`}>
            <div className={styles.ecoHead}>
              <span className={styles.ecoName}>Become a validator</span>
              <span className={`${styles.badge} ${styles.badgeLive}`}>1,000 {SITE.symbol}</span>
            </div>
            <p className={styles.ecoDesc}>
              The set is permissionless. Install with <code className={styles.mono}>--operator 0xYourWallet</code>,
              then bond at least 1,000 {SITE.symbol} on the staking page — one click, and you
              produce blocks from the next hourly epoch.
            </p>
            <ol className={styles.opSteps}>
              <li><strong>Top 12</strong> by self-stake + delegations are active</li>
              <li><strong>Miss &gt;20%</strong> of your slots and you sit out one epoch — no slashing</li>
              <li><strong>Leave any time</strong>; stake unbonds in ~4 hours</li>
            </ol>
            <div className={styles.opLinks}>
              <a className={`${styles.btn} ${styles.btnSm}`} href={LINKS.staking} target="_blank" rel="noopener noreferrer">
                Register →
              </a>
              <a className={`${styles.btn} ${styles.btnSm}`} href={LINKS.becomeValidator} target="_blank" rel="noopener noreferrer">
                How it works
              </a>
            </div>
          </Reveal>

          <Reveal as="article" delay={120} className={`${styles.ecoCard} ${styles.opCard}`}>
            <div className={styles.ecoHead}>
              <span className={styles.ecoName}>Earn points</span>
              <span className={`${styles.badge} ${styles.badgeLive}`}>500 / day</span>
            </div>
            <p className={styles.ecoDesc}>
              A node with your wallet as operator is verified automatically within ten minutes
              and earns 500 points a day while it is online. Trading earns 1 point per dollar.
              Verified nodes appear on the explorer&apos;s Network page with your badge.
            </p>
            <div className={styles.opLinks}>
              <a className={`${styles.btn} ${styles.btnSm}`} href={LINKS.points} target="_blank" rel="noopener noreferrer">
                Points →
              </a>
              <a className={`${styles.btn} ${styles.btnSm}`} href={LINKS.explorerNetwork} target="_blank" rel="noopener noreferrer">
                Network nodes
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
