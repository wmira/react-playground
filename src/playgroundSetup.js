
export const createEntry = (entryPath) => {

    return `
        import React from 'react';
        import ReactDom from 'react-dom';
        import Playground from 'react-playground-kit';
        import * as module from '${entryPath}';

        ReactDom.render(React.createElement(Playground, { module }), document.getElementById('app'));
    `;

}


export const createHtmlContainer = path => {
   return `<html>
        <header>
            <style>
                body, html, div {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    background-color: #fff;
                }
            </style>
        </header>
        <body>
            <div id='app'></div>
            <script src='file:///${path}/bundle.js'></script>
        </body>
    </html>
    `;
}
