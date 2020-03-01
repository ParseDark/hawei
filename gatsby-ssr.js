import "./src/styles/global.css"
const React = require("react")
const Layout = require("./src/components/layout")

// Adds a class name to the body element
const onRenderBody = ({ setBodyAttributes }, pluginOptions) => {
  setBodyAttributes({
    className: "my-body-class",
  })
}

export { onRenderBody as onRenderBody };

// Wraps every page in a component

const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

export { wrapPageElement as wrapPageElement }

export { default as wrapRootElement } from './src/state/ReduxWrapper';

