import { Story, StorybookConnection, StoriesBrowser } from "storycrawler";
import { StoryLoader } from "./story-loader";

const dummyStories: Story[] = [
  {
    id: "id",
    kind: "kind",
    story: "story",
    version: "v5",
  },
  {
    id: "id2",
    kind: "kind2",
    story: "story2",
    version: "v5",
  },
];
jest.mock("storycrawler", () => {
  return {
    StorybookConnection: jest.fn().mockImplementation(() => {
      return {
        connect: jest.fn(),
      };
    }),
    StoriesBrowser: jest.fn().mockImplementation(() => {
      return {
        boot: jest.fn().mockResolvedValue({
          getStories: () => Promise.resolve(dummyStories),
        }),
      };
    }),
  };
});

test("should throw error when invalid url is passed as constructor", () => {
  const loader = new StoryLoader();
  return expect(loader.getStoryIframeUrls("invalid-url")).rejects.toMatch(
    "Please check format of your url: invalid-url"
  );
});

test("should fetch array of Story iframe url when Storybook url is valid", () => {
  const loader = new StoryLoader();
  return expect(
    loader.getStoryIframeUrls(
      "https://storybookjs.netlify.app/vue-kitchen-sink"
    )
  ).resolves.toEqual([
    "https://storybookjs.netlify.app/vue-kitchen-sink/iframe?id=id&viewMode=story",
    "https://storybookjs.netlify.app/vue-kitchen-sink/iframe?id=id2&viewMode=story",
  ]);
});
