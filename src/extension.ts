import * as vscode from 'vscode';
import { configGpgKey } from './gpg/gpg';
import { configUserNameAndEmail } from './git/userNameAndEmail';

export async function activate(context: vscode.ExtensionContext) {
	const gpgDis = vscode.commands.registerCommand('gpg-configure.config', configGpgKey);
	context.subscriptions.push(gpgDis);

	const userNameAndEmailDisposable = vscode.commands.registerCommand('git-config.userNameAndEmail', configUserNameAndEmail);
	context.subscriptions.push(userNameAndEmailDisposable);
}

export function deactivate() { }
