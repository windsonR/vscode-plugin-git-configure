import { exec } from "child_process";

import * as vscode from 'vscode';

import { gitConfig } from '../utils';

const gpgSigRegex = /\bsig\s\d?\s+([0-9A-Za-z]+)\s(.*)\n/g;

export interface sigInformation {
  sig: string
  information: string
}

export function getGpgKeys(msg: string): Array<sigInformation> {
  const arr = msg.matchAll(gpgSigRegex);
  const sigMap = new Map();
  for (const match of arr) {
    const [_, sig, information] = match;
    sigMap.set(sig, information);
  }
  const result = [];
  for (let key of sigMap.keys()) {
    result.push({
      sig: key,
      information: sigMap.get(key)
    });
  }
  return result;
}

export function configGpgKey() {
  exec('gpg --list-sigs', async (err, stdout) => {
    if (err) {
      vscode.window.showErrorMessage(err.message);
      return;
    }
    const gpgKeys = getGpgKeys(stdout);
    const quickpick = gpgKeys.map(k => {
      return k.sig + '#' + k.information;
    });
    const configuration = await vscode.window.showQuickPick(quickpick);
    if (configuration) {
      const [sig, _] = configuration.split('#');
      gitConfig('user.signingkey', sig);
    }
  });
}
