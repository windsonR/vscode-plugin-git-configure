import * as vscode from 'vscode';
import type { GitExtension } from './git';

const gitExtension = vscode.extensions.getExtension<GitExtension>('vscode.git')?.exports;
const git = gitExtension?.getAPI(1);

export function gitConfig(registry: string, value: string) {
  git?.repositories[0].setConfig(registry, value);
}
