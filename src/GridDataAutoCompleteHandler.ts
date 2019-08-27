import BaseAutoCompleteHandler from "./BaseAutoCompleteHandler";
import Expression from "./Expression";
import * as _ from "lodash";

export default class GridDataAutoCompleteHandler extends BaseAutoCompleteHandler {

    parseResult: Expression[];
    categories: string[];
    cache: any = {};
    operators: any[];

    constructor(protected data: any[], protected options?: Option[], protected operator?: any[]) {
        super();

        this.parseResult = null;

        this.categories = _.map(this.options, f => {
            if (f.columnText) return f.columnText;
            return f.columnField
        });

        this.operators = operator;
    }

    needCategories() {
        return this.categories;
    }

    needOperators(parsedCategory: string) {

        var found = _.find(this.options, f => {
            return f.customOperatorFunc != null && (
                f.columnText == parsedCategory || f.columnField == parsedCategory
            )
        });

        if (found) {
            return found.customOperatorFunc(parsedCategory);
        }

        return this.operators;
    }

    needValues(parsedCategory: string, parsedOperator: string): any[] {

        if (parsedOperator == "is") {
            return ['null', 'not-null']
        }

        if (parsedOperator === ':in'){
            return ['[val1,val2]']
        }

        var found = _.find(this.options, f => f.columnField == parsedCategory || f.columnText == parsedCategory);

        if (found != null && found.type == "selection" && this.data != null) {
            if (!this.cache[parsedCategory]) {
                this.cache[parsedCategory] = _.chain(this.data).map(f => f[parsedCategory]).uniq().value();
            }
            return this.cache[parsedCategory];
        }

        if (found != null && found.customValuesFunc) {
            return found.customValuesFunc(parsedCategory, parsedOperator);
        }

        return [];
    }
}

export interface Option {
    columnField: string;
    columnText?: string;
    type: string;
    customOperatorFunc?: (category: string) => string[]
    customValuesFunc?: (category: string, operator: string) => string[]
}