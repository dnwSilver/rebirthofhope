export const REPO_GO = "cd ~/rebirthofhope;";
export const REPO_CLONE = (call: string | undefined) => `git clone --branch savior/${call} git@github.com:dnwSilver/rebirthofhope.git;`;
export const RUN_LINTING = "make verify;";
export const RUN_DEPLOY = "helmfile --environment production-app apply;";
export const GIT_STAGE = `git add {{YOUR_FILES}};`;
export const GIT_COMMIT = 'git commit --message "I did it!";';
export const GitPush = (call: string | undefined) => `git push origin savior/${call};`;
