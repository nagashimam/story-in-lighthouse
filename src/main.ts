try {
  const arg = process.argv.slice(2);
  if (arg.length < 1) {
    throw new Error(
      "No URL found.\nPlease tell me your Storybook URL\n(e.g: node dist/main.js https://storybookjs.netlify.app/vue-kitchen-sink)"
    );
  }
  console.log(process.argv.slice(2));
} catch (e) {
  console.log(e);
}
