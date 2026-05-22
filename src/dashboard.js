import { stat } from 'node:fs/promises';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

function runNpm(args, cwd) {
  const command = process.platform === 'win32' ? 'cmd.exe' : 'npm';
  const commandArgs = process.platform === 'win32'
    ? ['/d', '/s', '/c', 'npm', ...args]
    : args;
  const result = spawnSync(command, commandArgs, {
    cwd,
    stdio: 'inherit',
  });
  if (result.error) {
    console.error(`\n  Failed to run npm: ${result.error.message}\n`);
    return 1;
  }
  return result.status ?? 1;
}

export async function dashboard(targetDir, options = {}) {
  const dashboardDir = join(targetDir, 'dashboard');
  const packageJson = join(dashboardDir, 'package.json');

  if (!await exists(packageJson)) {
    console.log('\n  Dashboard not found in this Opensquad project.');
    console.log('  Run: npx opensquad update\n');
    return { success: false };
  }

  if (!await exists(join(dashboardDir, 'node_modules'))) {
    console.log('\n  Installing dashboard dependencies...\n');
    const installStatus = runNpm(['install'], dashboardDir);
    if (installStatus !== 0) return { success: false };
  }

  if (options.installOnly) {
    console.log('\n  Dashboard dependencies are ready.\n');
    return { success: true };
  }

  const args = ['run', 'dev', '--', '--host', '127.0.0.1'];
  if (options.port) {
    args.push('--port', String(options.port));
  }

  console.log('\n  Starting Opensquad dashboard...');
  console.log('  It reads squads/ and live state.json files from this project.\n');
  const status = runNpm(args, dashboardDir);
  return { success: status === 0 };
}
