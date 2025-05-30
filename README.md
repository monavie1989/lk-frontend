<img src="./.github/assets/app-icon.png" alt="Voice Assistant App Icon" width="100" height="100">

# Web Voice Assistant

This is a starter template for [LiveKit Agents](https://docs.livekit.io/agents/overview/) that provides a simple voice interface using the [LiveKit JavaScript SDK](https://github.com/livekit/client-sdk-js).

This template is built with Next.js and is free for you to use or modify as you see fit.

![App screenshot](/.github/assets/frontend-screenshot.jpeg)

## Getting started

> [!TIP]
> If you'd like to try this application without modification, you can deploy an instance in just a few clicks with [LiveKit Cloud Sandbox](https://cloud.livekit.io/projects/p_/sandbox/templates/voice-assistant-frontend).

Run the following command to automatically clone this template.

```bash
lk app create --template voice-assistant-frontend
```

Then run the app with:

```bash
pnpm install
pnpm dev
```

And open http://localhost:3000 in your browser.

You'll also need an agent to speak with. Try our sample voice assistant agent for [Python](https://github.com/livekit-examples/voice-pipeline-agent-python), [Node.js](https://github.com/livekit-examples/voice-pipeline-agent-node), or [create your own from scratch](https://docs.livekit.io/agents/quickstart/).

> [!NOTE]
> If you need to modify the LiveKit project credentials used, you can edit `.env.local` (copy from `.env.example` if you don't have one) to suit your needs.

## Contributing

This template is open source and we welcome contributions! Please open a PR or issue through GitHub, and don't forget to join us in the [LiveKit Community Slack](https://livekit.io/join-slack)!

# run agent in background mode
# create sh file for run service
```console
sudo vi /var/www/livekit/lk-frontend/start-frontend.sh
```
#!/bin/bash
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"

export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PNPM_HOME:$NVM_DIR/versions/node/v18.17.0/bin:$PATH"

cd /var/www/livekit/lk-frontend
pnpm dev

# install supervisord
# create supervisord config
```console
sudo vi /etc/supervisor/conf.d/livekit_frontend.conf
```
[program:livekit_frontend]
command=/var/www/livekit/lk-frontend/start-frontend.sh
directory=/var/www/livekit/lk-frontend
autostart=true
autorestart=false
stdout_logfile=/var/log/livekit_frontend.log
stderr_logfile=/var/log/livekit_frontend_err.log
environment=HOME="/home/ubuntu",USER="ubuntu"


```console
sudo supervisorctl reread
sudo supervisorctl update
```
