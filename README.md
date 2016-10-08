# WeTeach front-end code.
yeah, title tells all.

# initialize whole project.
npm run init

# generate sprite image.
npm run sprite

# Build on the test server:
Build whole project, run command **npm run build** on the server.
#### Notes:
This operation will generate minified code and other things, which has no differences compared with production env, besides the api host is test server.

# Build on the production server:
run command **npm run production**.
The operation will generate production code.

# Start:
**npm run start** to start the project, in production env, please select **Forever** or **PM2** to make it a daemon progress.

# Deploy on the local machine:
### Firstly.
export P=your project root directory,
export S=production server IP address.
### Then
just run command **npm run deploy**.
