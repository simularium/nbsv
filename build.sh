pip install -e .
jupyter nbextension install --py --overwrite --symlink --sys-prefix nbsv
jupyter nbextension enable --py --sys-prefix nbsv
jupyter labextension develop . --overwrite
yarn build