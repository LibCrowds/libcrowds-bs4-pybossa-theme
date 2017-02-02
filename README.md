# libcrowds-bs4-pybossa-theme

The [LibCrowds](http://www.libcrowds.com) PYBOSSA theme.


## Installation

Install [Node.js](https://nodejs.org/en/), then:

```
# Navigate to your themes folder
cd /home/pybossa/pybossa/themes
# Clone the repo
git clone https://github.com/LibCrowds/libcrowds-bs4-pybossa-theme
# Navigate to the libcrowds-bs4-pybossa-theme folder
cd libcrowds-bs4-pybossa-theme
# Install dependencies
npm install
# Build
npm build
```

Now add the following line to your main PYBOSSA configuration file:

```Python
THEME = 'libcrowds-bs4-pybossa-theme'
```

The theme will be available after you restart your PYBOSSA application.


## Project themes

Project pages can be configured using keys from a project's info field, the currently 
supported keys are:

- **splash:** A link to an image URL that will be displayed on the project's portal page.
- **splash_attribution:** Any attribution required for the above splash image.
- **tutorial_video:** Code to embed a tutorial video on the project's portal page (e.g. from Flickr).
- **dark_theme:** Set to True to use the dark theme for the project's presenter page.
