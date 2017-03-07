# libcrowds-bs4-pybossa-theme

The [LibCrowds](http://www.libcrowds.com) PYBOSSA theme.


## Installation

Install [Node.js](https://nodejs.org/en/), then:

```
# Navigate to your themes folder
cd /home/pybossa/pybossa/themes
# Clone the repo
git clone --recursive https://github.com/LibCrowds/libcrowds-bs4-pybossa-theme
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

