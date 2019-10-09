import * as React from 'react';
import FilterInput from "./FilterInput";
import SimpleResultProcessing from "./SimpleResultProcessing";

import GridDataAutoCompleteHandler, {Option} from "./GridDataAutoCompleteHandler";
import Expression from "./Expression";
import FilterQueryParser from "./FilterQueryParser";
import BaseResultProcessing from "./BaseResultProcessing";
import BaseAutoCompleteHandler from "./BaseAutoCompleteHandler";
import ParsedError from "./ParsedError";
import SqlMissingOperators from './SqlMissingOperators';

export default class ReactFilterBox extends React.Component<any, any> {

    public static defaultProps: any = {
        onParseOk: () => { },
        onClear: () => { },
        onParseError: () => { },
        onChange: () => { },
        onDataFiltered: () => { },
        autoCompleteHandler: null,
        onBlur: () => { },
        onFocus: () => { }
    };

    parser = new FilterQueryParser();
    private FilterInput: any;

    constructor(props: any) {
        super(props);

        let autoCompleteHandler = new GridDataAutoCompleteHandler(this.props.data, this.props.options, this.props.operators);

        this.parser.setAutoCompleteHandler(autoCompleteHandler);

        this.state = {
            isFocus: false,
            isError: false,
            result: []
        };
        //need onParseOk, onParseError, onChange, options, data
    }

    // @ts-ignore
    componentWillReceiveProps(nextProps) {
        if (nextProps.options !== this.props.options) {
            let autoCompleteHandler = new GridDataAutoCompleteHandler(nextProps.data, nextProps.options, nextProps.operators);
            this.parser.setAutoCompleteHandler(autoCompleteHandler);
        }
    }

    needAutoCompleteValues(codeMirror: any, text: string) {
        return this.parser.getSuggestions(text);
    }

    onSubmit(query: string) {
        var result = this.parser.parse(query);

        if ((result as ParsedError).isError) {
            return this.props.onParseError(result);
        }

        let newResult = this.getFields(result);
        return this.props.onParseOk(newResult);
    }

    getFields(result: any) {
        // @ts-ignore
        result.forEach( (item, index) => {
            if (item.hasOwnProperty('expressions')) {
                result[index].expressions = this.getFields(item.expressions);
            }
            else {
                if (item.operator === "is" && item.value === "null") {
                    item.operator = '=null';
                    item.value = '';
                }

                if (item.operator === "is" && item.value === "not-null") {
                    item.operator = '!=null';
                    item.value = '';
                }

                // @ts-ignore
                this.props.options.forEach( (data) => {
                    if ( item.category === data.columnText ) {
                        result[index] = {
                            ...item,
                            ['field']: data.columnField,
                            ['brand']: data.brand
                        };
                    }
                });
            }
        });
        return result;
    }

    onChange(query: string) {
        var result = this.parser.parse(query);
        if ((result as ParsedError).isError) {
            this.setState({ isError: true })
        } else {
            this.setState({ isError: false })
        }

        this.props.onChange(query, result);
    }

    onBlur() {
        this.setState({ isFocus: false });
    }

    onFocus() {
        this.setState({ isFocus: true });
    }

    onClear() {
        this.FilterInput.clearInput();
    }

    render() {
        var className = "react-filter-box";
        if (this.state.isFocus) {
            className += " focus"
        }
        if (this.state.isError) {
            className += " error"
        }

        return <div className={className}>
            <FilterInput
                autoCompletePick={this.props.autoCompletePick}
                customRenderCompletionItem={this.props.customRenderCompletionItem}
                onBlur={this.onBlur.bind(this)}
                onFocus={this.onFocus.bind(this)}
                value={this.props.query}
                needAutoCompleteValues={this.needAutoCompleteValues.bind(this)}
                onSubmit={this.onSubmit.bind(this)}
                onChange={this.onChange.bind(this)}
                ref={FilterInput => this.FilterInput = FilterInput}
            />
        </div>
    }
}

export {
    SimpleResultProcessing,
    BaseResultProcessing,
    GridDataAutoCompleteHandler,
    BaseAutoCompleteHandler,
    Option as AutoCompleteOption,
    Expression,
    SqlMissingOperators
};
