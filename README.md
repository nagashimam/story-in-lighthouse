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
