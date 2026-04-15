#!/bin/bash
# Small script to automatically sync your local changes to GitHub every 1 minute.
echo "Starting automatic GitHub sync..."
echo "Press Ctrl+C to stop this process."

while true; do
  # Add all changes
  git add .
  
  # Check if there are any changes to commit
  if ! git diff-index --quiet HEAD; then
    # Changes are found! Commit and push them.
    DATE=$(date +"%Y-%m-%d %H:%M:%S")
    git commit -m "Auto-sync update: $DATE"
    echo "Changes detected, pushing to GitHub at $DATE..."
    
    # Push to main branch 
    git push origin main
    
    if [ $? -eq 0 ]; then
      echo "✅ Successfully synced to GitHub!"
    else
      echo "❌ Failed to sync to GitHub."
    fi
  fi
  
  # Wait for 60 seconds before checking again (you can adjust this number)
  sleep 60
done
