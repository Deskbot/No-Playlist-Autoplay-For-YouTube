rm -rf output_firefox
mkdir -p output_firefox
cp -r icons scripts background.js LICENSE.txt options.html options.js output_firefox
cp manifest_firefox.json output_firefox/manifest.json
zip -r firefox output_firefox
