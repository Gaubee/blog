[https://api.github.com/repos/:owner/:repo/issues](#)

[https://api.github.com/repos/gaubee/blog/issues](https://api.github.com/repos/gaubee/blog/issues)

### Parameters

**milestone**
- Integer Milestone number
- none for Issues with no Milestone.
- '*' for Issues with any Milestone.

**state**
- open, closed, default: open

**assignee**
- String User login
- none for Issues with no assigned User.
- '*' for Issues with any assigned User.

**creator**
- String User login.

**mentioned**
- String User login.

**labels**
- String list of comma separated Label names. Example: bug,ui,@high

**sort**
- created, updated, comments, default: created

**direction**
- asc or desc, default: desc.

**since**
- Optional String of a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
[https://api.github.com/repos/gaubee/blog/issues?since=2013-06-01T00:00:00Z](https://api.github.com/repos/gaubee/blog/issues?since=2013-06-01T00:00:00Z)
