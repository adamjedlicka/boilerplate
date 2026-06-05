Copilot Agent setup

This repo includes a GitHub Actions workflow that listens for issue comments starting with `/copilot` and attempts to run the Copilot CLI to implement the requested task.

Setup steps:

1. Add a repository secret named `COPILOT_API_KEY` with a valid Copilot CLI API key or token.
2. Ensure runners have access to the Copilot CLI. The workflow attempts to install `@github/copilot-cli` if it's not present, but a self-hosted runner with the CLI preinstalled is more reliable.
3. Use an issue comment like:

   /copilot Implement a new endpoint to return user stats

What the workflow does:
- Creates a branch named `copilot/issue-<number>-<ts>`
- Attempts to run the Copilot CLI to implement the requested task
- If changes are created, commits, pushes, and opens a PR
- If the CLI cannot be used, posts a comment explaining how to enable it

Security:
- Do NOT store tokens in the repository. Use encrypted repository secrets.

Notes and next steps:
- Customize the handler script at `.github/scripts/copilot-agent-handler.sh` to match your Copilot CLI usage and preferences.
- Consider restricting the workflow trigger to users or labels to avoid misuse.
