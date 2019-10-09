import * as React from 'react';

import "fixed-data-table/dist/fixed-data-table.min.css";

import "../ReactFilterBox.less";
import "./app.less";
import Demo2 from "./demo2";

import { hot } from 'react-hot-loader'


class App extends React.Component<any, any> {
    render() {
        return (
            <div>
                <h2 style={{ textAlign: "center" }}>React Query Box</h2>
                <Demo2 />
            </div>
        )
    }
}

export default hot(module)(App)