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
  return expect(loader.getStories("invalid-url")).rejects.toMatch(
    "Please check format of your url: invalid-url"
  );
});

test("should fetch array of Story when url is valid", () => {
  const loader = new StoryLoader();
  return expect(
    loader.getStories("https://storybookjs.netlify.app/vue-kitchen-sink")
  ).resolves.toEqual(dummyStories);
});
