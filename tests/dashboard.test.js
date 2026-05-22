import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dashboard } from '../src/dashboard.js';

test('dashboard returns failure when project has no dashboard app', async () => {
  const tempDir = await mkdtemp(join(tmpdir(), 'opensquad-test-'));

  try {
    const result = await dashboard(tempDir, { installOnly: true });
    assert.equal(result.success, false);
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
});

test('dashboard CLI supports install-only and port flags', async () => {
  const tempDir = await mkdtemp(join(tmpdir(), 'opensquad-test-'));

  try {
    await mkdir(join(tempDir, 'dashboard', 'node_modules'), { recursive: true });
    await writeFile(join(tempDir, 'dashboard', 'package.json'), JSON.stringify({
      scripts: {
        dev: 'node -e "process.exit(9)"',
      },
    }));

    const result = spawnSync(process.execPath, [
      fileURLToPath(new URL('../bin/opensquad.js', import.meta.url)),
      'dashboard',
      '--install-only',
      '--port',
      '3333',
    ], {
      cwd: tempDir,
      encoding: 'utf-8',
    });

    assert.equal(result.status, 0);
    assert.match(result.stdout, /Dashboard dependencies are ready/);
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
});
