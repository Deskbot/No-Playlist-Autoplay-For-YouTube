# validate chosen browser to build for
if [ "$1" != "chrome" ] && [ "$1" != "firefox" ]; then
  echo "Expected the first argument to be chrome or firefox"
  echo "Received $1 instead"
  exit 1
fi

# create directory with the files we need
rm -rf output_$1 $1.zip
mkdir -p output_$1
cp -r src/* LICENSE.txt output_$1
cp manifest_$1.json output_$1/manifest.json

# build the zip
# The manifest needs to be at the top level inside the zip for Firefox.
# Chrome can handle whether it's at the top level or inside a single folder in the zip.
# We need to zip from inside the output folder so that the contents of the output folder are created at the top level of the zip.
# Yes it works like that.
cd output_$1
zip -r ../$1.zip *
cd -
