#!/bin/bash
# Deploy to GitHub Pages
# Usage: ./deploy.sh

# Build the app
npm run build

# Create .nojekyll to prevent Jekyll processing
touch dist/.nojekyll

# Initialize git in dist folder for gh-pages deployment
cd dist
git init
git add -A
git commit -m "Deploy EP Training Tool"

echo ""
echo "==================================="
echo "Build complete!"
echo "==================================="
echo ""
echo "To deploy to GitHub Pages:"
echo "1. Create a new GitHub repo (e.g., 'ep-training')"
echo "2. Run these commands:"
echo ""
echo "   cd dist"
echo "   git remote add origin https://github.com/YOUR_USERNAME/ep-training.git"
echo "   git branch -M gh-pages"
echo "   git push -u origin gh-pages"
echo ""
echo "3. Go to repo Settings > Pages > Source: gh-pages branch"
echo "4. App will be live at: https://YOUR_USERNAME.github.io/ep-training/"