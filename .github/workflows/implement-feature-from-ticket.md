---
on:
  issues:
    types: [opened, reopened]
permissions:
      contents: read
      issues: read
      pull-requests: read
engine: copilot
network:
  allowed:
    - defaults
    - python
    - node
    - go
    - java
tools:
  github:
    toolsets: [default]
  edit:
safe-outputs:
  create-agent-session:
  add-comment:
  create-pull-request:
  add-labels:
  remove-labels:
  add-reviewer:
  assign-to-agent:
  assign-to-user:
  update-issue:
  update-pull-request:
  push-to-pull-request-branch:
  mark-pull-request-as-ready-for-review:
---

# implement-feature-from-ticket

It should get instruction form the ticket, implement described feature or fix described bug (depending on the content of the ticket) and create a pull request.

<!--
## TODO: Customize this workflow

The workflow has been generated based on your selections. Consider adding:

- [ ] More specific instructions for the AI
- [ ] Error handling requirements
- [ ] Output format specifications
- [ ] Integration with other workflows
- [ ] Testing and validation steps

## Configuration Summary

- **Trigger**: Issue opened or reopened
- **AI Engine**: copilot
- **Tools**: github, edit
- **Safe Outputs**: create-agent-session, add-comment, create-pull-request, add-labels, remove-labels, add-reviewer, assign-to-agent, assign-to-user, update-issue, update-pull-request, push-to-pull-request-branch, mark-pull-request-as-ready-for-review
- **Network Access**: ecosystem

## Next Steps

1. Review and customize the workflow content above
2. Remove TODO sections when ready
3. Run `gh aw compile` to generate the GitHub Actions workflow
4. Test the workflow with a manual trigger or appropriate event
-->
