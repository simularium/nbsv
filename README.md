
# nbsv

[![Build](https://github.com/simularium/nbsv/actions/workflows/build.yml/badge.svg)](https://github.com/simularium/nbsv/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/simularium/nbsv/branch/main/graph/badge.svg)](https://codecov.io/gh/simularium/nbsv)


Simularium Viewer Jupyter Widget 

## Installation

You can install using `pip`:

```bash
pip install nbsv
```

## Development Installation

Create a dev environment:
```bash
conda create -n nbsv -c conda-forge yarn python=3.9 jupyterlab notebook
conda activate nbsv
```

Install and build:
```bash
yarn install
./build.sh
``` 

### How to see your changes
#### Typescript:
If you use JupyterLab to develop then you can watch the source directory and run JupyterLab at the same time in different
terminals to watch for changes in the extension's source and automatically rebuild the widget.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed.
# Note: You may need to run this in a terminal with elevated permissions (Run as Administrator)
yarn run watch
# Run JupyterLab in another terminal
jupyter lab
```

After a change wait for the build to finish and then refresh your browser and the changes should take effect.

The viewer widget is also compatible with Jupyter Notebook, so that can be used for development instead if preferred over JupyterLab.

#### Python:
If you make a change to the python code then you will need to restart the notebook kernel to have it take effect.

## Updating the version

To update the version, install tbump and use it to bump the version.
By default it will also create a tag.

```bash
pip install tbump
tbump <new-version>
```

