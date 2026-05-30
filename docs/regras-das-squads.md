# Regras das Squads - OpenSquad / Codex / Claude Code

Last updated: 2026-05-30.

This file is canonical for Jean's squads. It applies to Codex, Claude Code, OpenSquad, squad dashboards and JARVIS agent behavior.

## Principle

The product is JARVIS or the active project. The squad is only an execution instrument.

## Admission Rule

An agent may join the active squad only if all conditions are true:

- its expertise is necessary for the current deliverable;
- competence is proven by evidence, delivery history or a concrete skill;
- responsibility is clear;
- output is active and expected;
- proof/evidence path is defined;
- resource impact fits Jean's CPU/RAM budget;
- it will not slow the squad more than it helps.

Decorative, static, idle or "maybe useful" agents are forbidden.

## Default Squad Size

- Maximum 3 visible active agents by default.
- Agents must be senior, polyvalent and multi-stack.
- A fourth agent requires Jean's explicit temporary approval, a timebox and an exit condition.
- Specialist roles remain dormant or merged into one senior agent unless a real deliverable requires them.

## Resource Governor Replacement

- Do not create `Resource Governor`, `Resource Controller` or `Resource Steward` as a default agent/card.
- Replace it with `embedded_resource_guardian`: a protocol inside each active session.
- Resource state can appear as telemetry/status/panel, not as a visible active agent unless Jean asks for a diagnostic war-room.

## Performance Rule

- Use the maximum useful throughput allowed by Jean's resource ceiling.
- Never exceed Jean's CPU/RAM limits.
- Avoid large oscillations.
- Execute heavy work when needed, but through micro-batches, resource leases, cooldowns and one execution lane.
- If resources are green and no other session owns a test window, continue useful BUILD work.
- If resources become unstable, finish the current safe micro-step, checkpoint lightly and downgrade.

## Fixed Limits

- Max 10 chat lines by default.
- No large JSON/log dumps in chat.
- Max 10 active browser tabs total and 4 per Codex/Claude session.
- Only one session runs tests/executions at a time.
- Test windows: max 10 minutes and max 1 per hour.
- Failing operations: max 2 retries with backoff.
- UI builds: max 1 per hour and never during a test window.
- `RAM SIGNAL` below 2 GB forces `DOCS_ONLY` for 15 minutes.

## Continuous Learning Rule

Every squad must become better through:

- previous Jean projects;
- current project checkpoints;
- corrected mistakes;
- reusable patterns;
- audits and tests;
- memory updates at meaningful checkpoints.

No squad should start from zero when canonical notes, repo docs, Obsidian, Notion or memory exist.

Every repeated mistake becomes a durable rule, checklist, test, audit, prompt or memory note.

## Save Cadence

- Save persistent memory/Obsidian/Notion at meaningful task checkpoints or project end.
- Do not save after every micro-step.
- During execution, keep concise evidence pointers and flush them at task boundaries.

## Handoff Format

Use compact handoffs:

```text
CONTEXT:
DECISION:
NEXT:
EVIDENCE:
BLOCKER:
```

## Guardian Report

Every substantial work chunk ends with:

```text
MODE: BUILD | DOCS_ONLY | TEST_WINDOW
COMPLETED: <max 3 bullets>
NEXT: <max 3 bullets>
REQUESTS: <max 3 bullets>
GUARDIAN STATUS:
- Limits respected? yes/no
- Tests run this hour? 0/1
- Need TEST WINDOW? yes/no
```

## Dash Agents Rule

When Jean says `squad agentes`, `dash agentes` or `dash squad`, provide the live dashboard quickly and resume real project work.

A valid dash requires:

- real worker or event stream;
- HTTP 200 validation;
- dynamic `tick` or `activityCount`;
- moving agent cards;
- real task/status/progress/evidence/blocker per agent;
- visible exchange traces between agents;
- canonical sources loaded: Codex memory, Obsidian, Notion and repo docs.

Static agents are invalid.
