import { StoriesBrowser, StorybookConnection } from "storycrawler";

export class StoryIframeLoader {
  async getStoryIframeUrls(storybookUrl: string): Promise<string[]> {
    if (storybookUrl.match(/https?:\/\/.+/)) {
      const connection = await new StorybookConnection({
        storybookUrl,
      }).connect();
      const storiesBrowser = await new StoriesBrowser(connection).boot();
      const stories = await storiesBrowser.getStories();
      return stories.map(
        (story) => `${storybookUrl}/iframe?id=${story.id}&viewMode=story`
      );
    } else {
      return Promise.reject(`Please check format of your url: ${storybookUrl}`);
    }
  }
}
