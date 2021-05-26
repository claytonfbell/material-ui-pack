# Steps

1. `npm run build` to ensure it builds
2. `npm run release`
3. Push changes, check travis results
4. `npm run build`
5. `npm publish`

Note: `rm -rf node_modules` occasionally to clear some cache if typings in `dist/` are invalid
