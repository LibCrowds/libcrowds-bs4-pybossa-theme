# libcrowds-bs4-pybossa-theme

A [LibCrowds](http://www.libcrowds.com) theme using Bootstrap 4, SASS and Webpack.

The theme is to host a range of projects belonging to the same meta-category
(e.g. Card Catalogues or Playbills). Each of these meta-categories could
potentially contain hundreds of projects, so it makes sense to run each in a
seperate PYBOSSA instance to allow for better theming and targeted
descriptions.


## Installation

Install [Node.js](https://nodejs.org/en/) >= 4.x, then:

```
# Navigate to your themes folder
cd /home/pybossa/pybossa/themes

# Clone the repo
git clone --recursive https://github.com/LibCrowds/libcrowds-bs4-pybossa-theme

# Navigate to the libcrowds-bs4-pybossa-theme folder
cd libcrowds-bs4-pybossa-theme

# Install
npm install

# Build (see the _custom folder)
npm run build:<custom_theme>

# Serve at http://localhost:8080/
npm run dev:<custom_theme>
```

Now add the following line to your main PYBOSSA configuration file:

```Python
THEME = 'libcrowds-pybossa-theme'
```

The theme will be available after you restart your PYBOSSA application.


## Development

Custom theme options are defined in the [_custom](_custom) folder. To defined
theme options for a new metacategory add a new subfolder with the following
files:

- **_about.md:** Background info for the meta-category.
- **home.jpg:** Main image for the top of the homepage.
