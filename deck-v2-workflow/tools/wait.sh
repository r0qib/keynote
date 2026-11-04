#!/bin/sh
# Waits for an agent's completion signal while keeping the orchestrator's prompt cache warm.
# Usage: sh deck-v2-workflow/tools/wait.sh <signal-id> [seconds=270]
# Prints "done: <report>" as soon as .signals/<signal-id>.done exists, else "timeout" after <seconds>.
DIR="$(cd "$(dirname "$0")/.." && pwd)/.signals"
ID="$1"
LIMIT="${2:-270}"
[ -z "$ID" ] && { echo "usage: wait.sh <signal-id> [seconds]"; exit 2; }
mkdir -p "$DIR"
i=0
while [ "$i" -lt "$LIMIT" ]; do
  if [ -f "$DIR/$ID.done" ]; then
    echo "done: $(cat "$DIR/$ID.done")"
    exit 0
  fi
  sleep 5
  i=$((i + 5))
done
echo "timeout"
