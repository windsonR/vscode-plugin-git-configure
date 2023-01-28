import * as vscode from 'vscode';
import type { InputBoxOptions } from 'vscode';
import { gitConfig } from '../utils';

export async function configUserNameAndEmail() {
  let userNameOption: InputBoxOptions = {
    prompt: "userName: ",
    placeHolder: "(user.name)"
  };
  let emailOption: InputBoxOptions = {
    prompt: "email: ",
    placeHolder: "(user.email)"
  };
  const userName = await vscode.window.showInputBox(userNameOption);
  if (!userName) {
    vscode.window.showErrorMessage('需要输入一个用户名!');
    return;
  }
  gitConfig('user.name', userName);
  const email = await vscode.window.showInputBox(emailOption);
  if (!email) {
    vscode.window.showErrorMessage('需要输入一个邮箱!');
    return;
  }
  gitConfig('user.email', email);
}
