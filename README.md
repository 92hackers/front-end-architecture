# WeTeach front-end code.
yeah, title tells all.

# Build on the server:
Build whole project, run command ***npm run build*** on the server.

# Build on the local machine:
### Firstly.
export P=your project root directory,
export S=production server IP address.
### Then
just run command ***npm run deploy***.

# NOTES:
**gulp sprites** needs to install sprity module: cnpm install sprity. before that, you should install node-gyp, and make sure your gcc or clang supprts C++ 11, last, we recommend you install sprity with cnpm, for npm has a problem of permission, you need to **npm install cnpm -g**. in the end, set your machine's environment: **export LD_LIBRARY_PATH=/usr/local/lib64/:$LD_LIBRARY_PATH**.
