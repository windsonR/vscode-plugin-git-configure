import * as vscode from 'vscode';
import type { GitExtension } from './git';

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

export function gitConfig(sig: string) {
  const gitExtension = vscode.extensions.getExtension<GitExtension>('vscode.git')?.exports;
  const git = gitExtension?.getAPI(1);
  git?.repositories[0].setConfig('user.signingkey', sig);
}
