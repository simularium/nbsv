"""Top-level package for nbsv."""

from importlib.metadata import PackageNotFoundError, version
# from ._version import __version__

try:
    __version__ = version("nbsv")
except PackageNotFoundError:
    __version__ = "uninstalled"

__author__ = "Megan Riel-Mehan"
__email__ = "meganr@alleninstitute.org"


def _prefix():
    import sys
    from pathlib import Path

    prefix = sys.prefix
    here = Path(__file__).parent
    # for when in dev mode
    if (here.parent / "share/jupyter/nbextensions/nbsv").exists():
        prefix = here.parent
    return prefix


def _jupyter_labextension_paths():
    return [{
        "src": f"{_prefix()}/share/jupyter/labextensions/nbsv/",
        "dest": "nbsv"
    }]


def _jupyter_nbextension_paths():
    """Called by Jupyter Notebook Server to detect if it is a valid
    nbextension and to install the widget
    Returns
    =======
    section: The section of the Jupyter Notebook Server to change.
        Must be 'notebook' for widget extensions
    src: Source directory name to copy files from. Webpack outputs
        generated files into this directory and Jupyter Notebook copies from
        this directory during widget installation
    dest: Destination directory name to install widget files to. Jupyter
        Notebook copies from `src` directory into
        <jupyter path>/nbextensions/<dest> directory during widget installation
    require: Path to importable AMD Javascript module inside the
        <jupyter path>/nbextensions/<dest> directory
    """
    return [
        {
            "section": "notebook",
            "src": "nbextension",
            "dest": "nbsv",
            "require": "nbsv/extension",
        }
    ]
