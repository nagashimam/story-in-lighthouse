# story-in-lighthouse

## What it does

Give it your Storybook URL like:

```bash
node dist/main.js 'https://storybookjs.netlify.app/vue-kitchen-sink'
```

And it'll download lighthouse report as csv.

This is simple proof of concept. I may publish this repository as npm package after I'm sure it works.

## Known Issues

### Error: Failed to launch the browser process (where you download this project)/.local-chromium/XXXXX

You'll see this error at the first time you run this program. This is because chromium isn't installed to the expected path.

Go to node_modules/puppeteer and you'll find .local-chromium or zip file of chromium. Copy the directory or unzip it to the path according to the error message you're seeing.

### Process keeps waiting

You need to run `npx lighthouse 'https://storybookjs.netlify.app/vue-kitchen-sink/iframe.html?id=issues-11839-undefined-boolean--primary&args=disabled:true&viewMode=story' --output=csv --output-path=stdout` and lighthouse will ask you to get permission to send report. Without running this command beforehand, lighthouse will wait for your input forever and never finish its job.
