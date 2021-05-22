import { StoriesBrowser, Story, StorybookConnection } from "storycrawler";

export class StoryLoader {
  async getStories(storybookUrl: string): Promise<Story[]> {
    if (storybookUrl.match(/https?:\/\/.+/)) {
      const connection = await new StorybookConnection({
        storybookUrl,
      }).connect();
      const storiesBrowser = await new StoriesBrowser(connection).boot();
      return storiesBrowser.getStories();
    } else {
      return Promise.reject(`Please check format of your url: ${storybookUrl}`);
    }
  }
}
