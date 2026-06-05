#!/usr/bin/env bash
set -euo pipefail

input="${1:-}"
issue_number="${2:-}"
issue_user="${3:-}"
# strip leading command if present
task="$(echo "$input" | sed -E 's|^/copilot\s*||')"

if [ -z "$task" ]; then
  echo "No task found in issue title or body. Add a description to the issue."
  if command -v gh >/dev/null 2>&1; then
    gh issue comment "$issue_number" --body "Copilot agent was triggered but no task description was found in the issue title or body. Please add a description."
  fi
  exit 0
fi

if [ -z "${COPILOT_API_KEY:-}" ]; then
  echo "COPILOT_API_KEY not set. Please add as repository secret COPILOT_API_KEY."
  if command -v gh >/dev/null 2>&1; then
    gh issue comment "$issue_number" --body "Copilot agent received the task but COPILOT_API_KEY is not configured. Please add the secret COPILOT_API_KEY to enable automatic implementation."
  fi
  exit 0
fi

branch="copilot/issue-${issue_number}-$(date +%s)"

git config user.name "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"

echo "Creating branch $branch"
# create branch from default branch
git fetch origin
git checkout -b "$branch"

# Try to run copilot CLI delegate (best-effort)
if command -v copilot >/dev/null 2>&1; then
  echo "Found copilot CLI — delegating task"
  copilot delegate --task "$task" --branch "$branch" || echo "copilot delegate failed"
else
  echo "copilot CLI not found — attempting npm install"
  npm install -g @github/copilot-cli@latest || true
  if command -v copilot >/dev/null 2>&1; then
    copilot delegate --task "$task" --branch "$branch" || echo "copilot delegate failed"
  else
    echo "Copilot CLI unavailable. Posting guidance comment."
    if command -v gh >/dev/null 2>&1; then
      gh issue comment "$issue_number" --body "Copilot agent received: \"$task\" but the runner couldn't install the Copilot CLI. To enable automated implementation add COPILOT_API_KEY secret and a runner image with the Copilot CLI available, or run locally using the Copilot CLI."
    fi
    exit 0
  fi
fi

# If copilot created changes, commit & push and open PR
if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -m "Implement: ${task}" || true
  git push --set-upstream origin "$branch"
  if command -v gh >/dev/null 2>&1; then
    # create PR and capture URL
    gh pr create --title "Copilot: ${task}" --body "Automated implementation of: ${task}" --head "$branch" || true
    pr_url=$(gh pr view --json url --jq .url --head "$branch" 2>/dev/null || true)
    if [ -n "$pr_url" ]; then
      gh issue comment "$issue_number" --body "Opened PR: $pr_url\n\nThis PR was created automatically to implement the issue description. Please review and merge when ready."
    else
      gh issue comment "$issue_number" --body "A PR was created for the implementation, but the runner couldn't determine the PR URL."
    fi
  fi
else
  echo "No changes created by Copilot."
  if command -v gh >/dev/null 2>&1; then
    gh issue comment "$issue_number" --body "Copilot attempted to implement the task but produced no changes."
  fi
fi
