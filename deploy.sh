#!/bin/bash

## If you would like to view the examples on iOS easily, use this script with Cloudflare Pages
## https://pages.cloudflare.com/ and set the LAUNCH_API_KEY environment variable.
## Set the build command to ./deploy.sh, and the output folder to 'build'.

dir="$(pwd)"

echo "Copying files to ./build directory..."
mkdir -p "$dir"/build
cp -r ./aframe "$dir"/build
cp -r ./babylonJS "$dir"/build
cp -r ./playcanvas "$dir"/build
cp -r ./threejs "$dir"/build

api_key="$LAUNCH_API_KEY"

# Check if the LAUNCH_API_KEY environment variable is set
if [ -z "$api_key" ]; then
    echo "Error: LAUNCH_API_KEY environment variable is not set."
    exit 1
fi

find . -type f \( -iname "*.html" -o -iname "*.js" -o -iname "*.jsx" -o -iname "*.ts" -o -iname "*.tsx" \) | while read -r file
do
    if grep -q "YOUR_SDK_KEY" "$file"; then
        echo "Found YOUR_SDK_KEY in $file"
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i "" "s/YOUR_SDK_KEY/\"$api_key\"/g" "$file"
        else
            sed -i "s/YOUR_SDK_KEY/\"$api_key\"/g" "$file"
        fi
    fi
done

echo "Done."