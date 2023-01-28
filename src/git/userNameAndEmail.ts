import * as vscode from 'vscode';
import type { InputBoxOptions } from 'vscode';
import { gitConfig } from '../utils';

export async function configUserNameAndEmail() {
  let userNameOption: InputBoxOptions = {
    prompt: vscode.l10n.t('message.userName.prompt', 'username: '),
    placeHolder: vscode.l10n.t('message.userName.placeholder', '(user.name)')
  };
  let emailOption: InputBoxOptions = {
    prompt: vscode.l10n.t('message.email.prompt', 'email: '),
    placeHolder: vscode.l10n.t('message.email.placeholder', '(user.email)')
  };

  const userName = await vscode.window.showInputBox(userNameOption);
  if (!userName) {
    if (userName !== undefined) {
      vscode.window.showErrorMessage(vscode.l10n.t('error.needUserName', 'need input an username'));
    }
    return;
  }
  gitConfig('user.name', userName);
  const email = await vscode.window.showInputBox(emailOption);
  if (!email) {
    if (email !== undefined) {
      vscode.window.showErrorMessage(vscode.l10n.t('error.needEmail', 'need input an Email'));
    }
    return;
  }
  gitConfig('user.email', email);
}
