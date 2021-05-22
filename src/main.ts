import { StoryIframeLoader } from "./story-loader/story-loader";
import { StorybookConnection, StoriesBrowser } from "storycrawler";
(async () => {
  try {
    console.log("hoge");
    // const arg = process.argv.slice(2);
    // if (arg.length < 1) {
    //   throw new Error(
    //     "No URL found.\nPlease tell me your Storybook URL\n(e.g: node dist/main.js https://storybookjs.netlify.app/vue-kitchen-sink)"
    //   );
    // }
    // const loader = new StoryLoader(arg[0]);
    // console.log(process.argv.slice(2));
    // Connect to the target Storybook server.
    const storybookUrl = "https://storybookjs.netlify.app/vue-kitchen-sink";
    const connection = await new StorybookConnection({
      storybookUrl,
    }).connect();

    // Launch Puppeteer process to fetch stories info.
    const storiesBrowser = await new StoriesBrowser(connection).boot();
    // Item in stories has name, kind and id of the corresponding story
    const stories = await storiesBrowser.getStories();
    console.log("found stories", stories);
  } catch (e) {
    console.log(e);
  }
})();
