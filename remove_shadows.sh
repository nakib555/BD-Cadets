#!/bin/bash
find src/pages src/components src/App.tsx -type f -name "*.tsx" -print0 | while IFS= read -r -d '' file; do
    sed -i 's/shadow-\[0_2px_10px_-4px_rgba(0,0,0,0\.05)\]//g' "$file"
    sed -i 's/shadow-\[0_2px_12px_-4px_rgba(0,0,0,0\.08)\]//g' "$file"
    sed -i 's/shadow-\[0_4px_12px_-4px_rgba(37,99,235,0\.5)\]//g' "$file"
    sed -i 's/shadow-sm//g' "$file"
    sed -i 's/shadow-md//g' "$file"
    sed -i 's/shadow-lg//g' "$file"
    sed -i 's/shadow-xl//g' "$file"
    sed -i 's/shadow-2xl//g' "$file"
    sed -i 's/shadow-inner//g' "$file"
    sed -i 's/shadow//g' "$file"
    sed -i 's/border-gray-100/border-gray-200/g' "$file"
done
