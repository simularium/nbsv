# Install the python. This will also build the TS package.
pip install -e '.[test, examples]'

yarn clean
yarn build