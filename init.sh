#!/usr/bin/env bash

BASE_PATH=$(pwd)

echo "upgrade npm to latest version."
npm install npm@latest -g

echo "set LD_LIBRARY_PATH."
export LD_LIBRARY_PATH=/usr/local/lib64/:$LD_LIBRARY_PATH

echo "install dependencies."
npm install
