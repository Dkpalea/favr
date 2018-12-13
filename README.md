## Favr Project Details

Favr is an on-demand task app for UCSC students. It is built with React and Web2Py.

Myron Pow - mpow@ucsc.edu

Dustin Palea - dpalea@ucsc.edu

## React
**Setup and Commands**
- React injects elements into the DOM at runtime.
- React and all of our front-end source code can be found within `favr-final-project/applications/favr/react-files`. We will refer to this as the React root directory.
- Before changing the source code or running any of the below commands, make sure that NodeJS is installed and run `npm install` from the React root directory.
- We've used Webpack with React in order to bundle all of our javascript and style files.
These files are exported to the single minified file `favr-final-project/applications/favr/static/js/default_index.js` (style files exist as objects within this bundle).
- To recompile this bundle, run `npm run build` from the React root directory.
- To run a development server (irrespective of Web2Py) run `npm start` from the React root directory. This will host at `localhost:8080`. Keep in mind that this development server is kept in memory and does not read from the bundle file mentioned in the fourth bullet above. EDIT: Won't work in current branch (last minute global var changes that haven't been updated in the index that this server uses)

**Organization and Execution**

Within the React root directory there is a `src` file which contains all of our front-end source code. This includes `.js`, `.jsx`, and `.css`/`.scss` files. Quick note, `jsx` files are a combined syntax of html and javascript.

The following is a high level overview of how our React app executes. We use `~` to denote the React root directory (see bullet two in the above section).
1) `~/app.jsx` mounts to the DOM, taking control of the element with `id="app"`.
2) It then renders components on a conditional basis, that condition being the URL route. Our router is defined in `~/routers/App.Routers.jsx`.
3) Based on the route, this router then renders the appropriate component(s) out of those defined in `~/components/`.
4) Each of these components in turn importing other components and passing data downward via one-way data binding.

Our style files are located at `~/styles` with partials being defined within sub-directories. All partials are eventually aggregated via imports into the main style file `~/styles/styles.scss`. As mentioned earlier, on compilation these styles are converted to objects within the single bundled javascript file.

## Web2Py
**Organization and Execution**

In this section we use `$` to denote the favr application root directory `favr-final-project/applications/favr`.

Web2Py operates as it would with any other web application, simply hosting `$/views/default/index.html` which in turn runs the bundle script that was exported by WebPack `$/static/js/bundle.js` (explained in the React section above).

## Useful commands
- run from `favr-final-project/applications/favr/react-files`
    - Need to install all modules before running any commands `npm install`
    - Recompile javascript bundle and save to Web2Py's static/js file `npm run build`
    - Same as above but automatic, re-compiles js bundle by watching react-files folder for changes `npm run watch`
    - Local host of react only (doesn't work with API but is useful for testing styles) `npm start`
- run from `favr-final-project/applications/favr`
    - Start web2py `python web2py.py`. Will likely need to delete all database files on first launch. Delete all files in `favr-final-project/applications/favr`.
    
Note: we've found that the best workflow is to keep both the `npm run watch` command running at the same time as the `python web2py.py` server (in separate terminal tabs)
