export const REPO_GO = "cd ~/rebirthofhope;";
export const REPO_CLONE = "git clone git@github.com:dnwSilver/rebirthofhope.git;";
export const RepoSwitch = (call: string | undefined) => `git switch savior/${call}`;
export const RUN_LINTING = "make verify;";
export const RUN_DEPLOY = "helmfile --environment production-app apply;";
export const GIT_STAGE = "git add environments/production-app/api.yaml.gotmpl;";
export const GIT_COMMIT = 'git commit --message "I did it!";';
export const GitPush = (call: string | undefined) => `git push origin savior/${call};`;
