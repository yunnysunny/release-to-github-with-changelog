#! /usr/bin/env node
const fs = require('fs');
const gitUrlParse = require('git-url-parse');

module.exports = {
  extractEnv,
  getRepoFullnameFromPackage,
  getVersionFromPackage,
  getRepoFullnameFromGitRemote,
};

function extractEnv(envFile) {
  const rawEnv = fs.readFileSync(envFile, 'utf8');
  const couples = rawEnv
  .replace(/'/g, '')
  .split('\n')
  .filter(couple => couple.indexOf('=') > -1);
  const env = {};
  couples.forEach(couple => {
    env[couple.split('=')[0]] = couple.split('=')[1];
  });
  return env;
}

function getRepoFullnameFromPackage() {
  const repoUrl = getPackageJson().repository.url;
  const info = gitUrlParse(repoUrl);
  return `${info.owner}/${info.name}`;
}

function getRepoFullnameFromGitRemote(url) {
  const info = gitUrlParse(url);
  return `${info.owner}/${info.name}`;
}

function getVersionFromPackage() {
  return getPackageJson().version;
}

function getPackageJson() {
  return JSON.parse(fs.readFileSync('package.json', 'utf8'));
}
