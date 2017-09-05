#!/bin/bash
RED='\033[0;31m'
trap 'exit_build' ERR

function exit_build {
	echo -e "${RED}Something went wrong and the build has stopped.See error above for more details."
	exit 1
}

# Currently a one-off script to push a built version to a GitHub branch or tag.
# If no tag or branch is set as a param, it defaults to 'master-built' branch.

JPO_GIT_DIR=$(dirname "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )" )
JPO_TMP_DIR="/tmp/jpo"
JPO_TMP_DIR_2="/tmp/jpo2"
TARGET=${1:-master-built}

cd $JPO_GIT_DIR

# Make sure we don't have uncommitted changes.
if [[ -n $( git status -s --porcelain ) ]]; then
	echo "Uncommitted changes found."
	echo "Please deal with them and try again clean."
	exit 1
fi

# Make sure we're trying to deploy something that exists.
if [[ -z $( git branch -r | grep "$TARGET" ) && -z $( git tag | grep "$TARGET" ) ]]; then
	echo "Branch or Tag $TARGET not found in git repository."
	echo "Please try again with a valid tag or branch name."
	exit 1
fi

read -p "You are about to deploy a new production build to the $TARGET branch or tag. Are you sure? [y/N]" -n 1 -r
if [[ $REPLY != "y" && $REPLY != "Y" ]]
then
	exit 1
fi
echo ""

echo "Building Jetpack Onboarding"

npm run build-production

echo "Done"

# Prep a home to drop our new files in. Just make it in /tmp so we can start fresh each time.
rm -rf $JPO_TMP_DIR
rm -rf $JPO_TMP_DIR_2

echo "Rsync'ing everything over to $JPO_TMP_DIR_2"

rsync -r --exclude-from 'bin/build-excludes.txt' $JPO_GIT_DIR/* $JPO_TMP_DIR_2

echo "Done!"

echo "Pulling latest from $TARGET branch"
git clone --depth 1 -b $TARGET --single-branch git@github.com:Automattic/jetpack-onboarding.git $JPO_TMP_DIR
echo "Done!"

cd $JPO_TMP_DIR

# Remove all files except the .git directory, so that we get a clean copy.
git rm -rfq .

echo "Rsync'ing everything over remote version"
rsync -r $JPO_TMP_DIR_2/* $JPO_TMP_DIR
echo "Done!"

echo "Finally, Committing and Pushing"
git add .
git commit -am 'New build'
git push origin $TARGET
echo "Done! Branch $TARGET has been updated."

echo "Cleaning up the mess"
cd $JPO_GIT_DIR
rm -rf $JPO_TMP_DIR
rm -rf $JPO_TMP_DIR_2
echo "All clean!"
