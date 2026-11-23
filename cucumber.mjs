// The runner is pointed at the compiled specs by one line: `paths`. Everything else is defaults.
export default {
  paths: ['walkthrough/specs/**/*.feature'],
  import: ['tests/steps/**/*.js'],
  tags: 'not @skip',
};
