import { StoryIframeLoader } from "./story-loader/story-loader";
import { exec, spawn } from "child_process";

function runCommand(iframe: string, index: number) {
  // cannot redirect stdout to report.csv for some reason >_<
  // const commandline = `npx lighthouse ${iframe} --chrome-flags=\'--headless\' --output=\'csv\' --output-path=\'stdout\' >> report.csv`;
  const commandline = `npx lighthouse ${iframe} --chrome-flags=\'--headless\' --output=\'csv\' --output-path=\'temp${index}.csv\'`;
  const parts = commandline.split(" ");
  const cmd = parts[0];
  const args = parts.splice(1);

  const child = spawn(cmd, args, {
    stdio: "inherit",
    detached: true,
    env: process.env,
  });
  child.unref();
}
(async () => {
  try {
    const arg = process.argv.slice(2);
    if (arg.length < 1) {
      throw new Error(
        "No URL found.\nPlease tell me your Storybook URL\n(e.g: node dist/main.js https://storybookjs.netlify.app/vue-kitchen-sink)"
      );
    }
    await exec(
      "echo 'requestedUrl,finalUrl,category,name,title,type,score' > report.csv"
    );
    const iframes = await new StoryIframeLoader().getStoryIframeUrls(arg[0]);
    iframes.forEach((iframe, index) => {
      runCommand(iframe, index);
    });
  } catch (e) {
    console.log(e);
  }
})();
