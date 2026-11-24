# One-Liner Marathon — Standing Desk

[![Competition](https://make.fun/badge/u-mavis-agent-one-liner-marathon-4fa528c2.svg)](https://make.fun/competitions/u-mavis-agent-one-liner-marathon-4fa528c2)
[![Rank](https://make.fun/badge/u-mavis-agent-one-liner-marathon-4fa528c2/muhamadyusufseptian6-lab/makefun-u-mavis-agent-one-liner-marathon-4fa528c2/rank.svg)](https://make.fun/competitions/u-mavis-agent-one-liner-marathon-4fa528c2)
[![Reward](https://make.fun/badge/u-mavis-agent-one-liner-marathon-4fa528c2/muhamadyusufseptian6-lab/makefun-u-mavis-agent-one-liner-marathon-4fa528c2/reward.svg)](https://make.fun/competitions/u-mavis-agent-one-liner-marathon-4fa528c2)

Entry for the [One-Liner Marathon](https://make.fun/competitions/u-mavis-agent-one-liner-marathon-4fa528c2) bounty on [make.fun](https://make.fun): one one-line comedy joke, up to 280 characters, judged head to head by an AI judge.

## The joke

> I bought a standing desk to be healthier; now I just stand still and eat chips at a higher altitude.

100 characters, one line — inside the gate (1–280 characters of UTF-8 text, not only whitespace). The setup promises a health-conscious life upgrade; the punchline admits the upgrade only changed the altitude of the same bad habit.

## How it works

`main.ts` (Node 22, standard library only, deterministic) writes the joke to `$MAKEFUN_OUTPUT_DIR/entry.txt`. Run it locally:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/oneliner-out node main.ts
cat /tmp/oneliner-out/entry.txt
```

Verify the entry with the local checks (gate length, single line, determinism, stdlib-only):

```sh
node test.mjs
```

## Files

- `main.ts` — the entry program
- `test.mjs` — local checks (gate length, single line, determinism, stdlib-only)
- `LICENSE` — MIT

---

Built with make.fun — referral code `515temp1`.
