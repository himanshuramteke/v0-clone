#!/bin/bash

# This script runs during building the sandbox template
# and makes sure the Next.js app is (1) running and (2) the `/` page is compiled
function ping_server() {
    counter=0
    while true; do
        response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000")
        if [[ ${response} -eq 200 ]]; then
            echo "Server is up and page is compiled!"
            # Kill the background dev server process
            kill $NEXT_PID
            exit 0
        fi
        
        let counter++
        if (( counter % 20 == 0 )); then
            echo "Waiting for server to start... (Attempt $counter)"
        fi
        sleep 0.5
        
        if (( counter > 240 )); then
            echo "Timeout waiting for server"
            kill $NEXT_PID
            exit 1
        fi
    done
}

cd /home/user/myapp
# Start Next.js dev server in background
npx next dev --turbopack &
NEXT_PID=$!

# Run the ping function
ping_server
