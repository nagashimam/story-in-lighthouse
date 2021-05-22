import { StoryIframeLoader } from "./story-loader/story-loader";
import { exec } from "child_process";
(async () => {
  try {
    const arg = process.argv.slice(2);
    if (arg.length < 1) {
      throw new Error(
        "No URL found.\nPlease tell me your Storybook URL\n(e.g: node dist/main.js https://storybookjs.netlify.app/vue-kitchen-sink)"
      );
    }
    await exec("echo '' > report.csv");
    const iframs = await new StoryIframeLoader().getStoryIframeUrls(arg[0]);
    iframs.forEach(async (iframe) => {
      console.log(`audit for ${iframe}`);
      await exec(
        `npx lighthouse '${iframe}' --output='csv' --output-path='stdout' >> report.csv`
      );
    });
  } catch (e) {
    console.log(e);
  }
})();
