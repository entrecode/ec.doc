# App CMS Documentation Repository

This repository holds documentation in Markdown files. 

It is deployed at [https://doc.entrecode.de](https://doc.entrecode.de) using [ReadTheDocs.org](https://readthedocs.org/projects/entrecode/). 

## Structure

All documentation files are in /doc.
The only other file needed is the mkDocs Configuration file `mkdocs.yml`.

## Build

ReadTheDocs uses either Sphinx/reStructuredText or MkDocs/Markdown as Syntax and Rendering Engine. 
We chose Markdown – while it is not as powerful as reStructuredText, it is far more wide-spread, has great tooling ([MacDown](http://macdown.uranusjr.com/)) and is easier to use. As Rendering Engine (putting Markdown files together, generating Navigation etc.) we use [MkDocs](http://www.mkdocs.org/). 
This can also be installed locally for live preview:

```
$ pip install mkdocs
$ mkdocs serve
Running at: http://127.0.0.1:8000/
```

After comitting, we can render it in the live deployment at [ReadTheDocs.org](https://readthedocs.org/projects/entrecode/) (they clone the public Git Repository) where it gets rendered with MkDocs again, but gets extra Versioning and Internationalization. 

The MkDocs configuration is in `mkdocs.yml`.

## Configuration

The appcms-doc Repository lies in Stash, but is public. ReadTheDocs can read and build it and puts it live at their subdomain. 

Our Angus nginx configuration reverse-proxies https://doc.entrecode.de to http://entrecode.readthedocs.org. 


## Old Rendering
Before we had ReadTheDocs, we simply used a Grunt Task to render static HTML from the markdown files (with manual linking).
