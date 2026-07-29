#!/bin/bash
# delete lines 444 to 468
sed -i '444,468d' src/pages/Photosynthesis.tsx

# insert the new content at line 444
sed -i '443 r block.txt' src/pages/Photosynthesis.tsx
