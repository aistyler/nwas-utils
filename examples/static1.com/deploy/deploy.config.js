
const path = require('path');

const svcUser = 'svc00';
const devUser = 'peterk';
const remote = '127.0.0.1';

const repoDir = `/home/${devUser}/static1-release`;
const svcDir = `/var/was/static1-service`;

const outputFile = 'release-static1.tar';
const rootDir = path.join(__dirname, '..');

module.exports = {
  svcUser,
  devUser,
  remote,
  repoDir,
  svcDir,

  tar: {
    src: {
      // absolute path of project directory
      baseDir: rootDir,
      files: [
        'public',
        'deploy',
        'ecosystem.config.js',
      ]
    },
    output: path.join(rootDir, outputFile),
  },

  scp: {
    server: `${devUser}@${remote}`,
    dest: '/tmp',
    // absolute path
    files: [
      path.join(rootDir, outputFile),
    ]
  },

  script: {
    server: `${devUser}@${remote}`,
    cwd: repoDir,
    cmds: 
`#!/bin/bash

# go to repoDir
cd ${repoDir}

# when git is dirty, exit with 1
if [ "$(git status -s)" != "" ]; then
  echo git is DIRTY !!!
  echo *CLEANUP* first...
  exit 1
fi

# untar
echo --- untar release.tar...
tar -xvf /tmp/${outputFile} -C ./

# git commit
echo --- release checkout...
if [ $(git symbolic-ref --short HEAD) != "release" ]; then
  git checkout release
fi
echo --- commit new release...
if [ "$(git status -s)" != "" ]; then
  git add -A
  git commit -m "by nwas-deploy"
fi

# pm2 deploy
echo --- pm2 deploy...
if [ ! -d "${svcDir}/production" ]; then
  pm2 deploy ecosystem.config.js production setup
fi

pm2 deploy ecosystem.config.js production update --force

#`,
  }
};
