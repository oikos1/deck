#!/usr/bin/env bash
# the name & email you actually want:
NAME="oikos1"
EMAIL="albert@oikos.cash"

# make sure these are four separate assignments!
export GIT_AUTHOR_NAME="$NAME"
export GIT_AUTHOR_EMAIL="$EMAIL"
export GIT_COMMITTER_NAME="$NAME"
export GIT_COMMITTER_EMAIL="$EMAIL"

# now amend (or commit) and Git will pick up the correct author/committer:
git commit --amend --no-edit
