rm -rf output_firefox firefox.zip
mkdir -p output_firefox
cp -r src/* LICENSE.txt output_firefox
cp manifest_firefox.json output_firefox/manifest.json

cd output_firefox
zip -r ../firefox.zip *
cd -