# App CMS Documentation Repository

This repository holds documentation in Markdown files. 

It is deployed at [https://doc.entrecode.de](https://doc.entrecode.de).

## Structure

All documentation files are in /doc.
The only other file needed is the mkDocs Configuration file `mkdocs.yml`.

## Build

As Rendering Engine (putting Markdown files together, generating Navigation etc.) we use [MkDocs](http://www.mkdocs.org/). MkDocs will be installed during npm dependency installation.

This can also be installed locally for live preview:

```sh
$ npm start
Running at: http://127.0.0.1:8000/

$ npm run build
```

(If needed, install pip first: https://pip.readthedocs.io/en/stable/installing/ )

After comitting, we can render it in Bamboo.

The MkDocs configuration is in `mkdocs.yml`.
