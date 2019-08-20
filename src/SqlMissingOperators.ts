import {GridDataAutoCompleteHandler} from "./ReactFilterBox";

//extend this class to add your custom operator
export default class SqlMissingOperators extends GridDataAutoCompleteHandler {

    // override this method to add new your operator
    needOperators(parsedCategory: string) {
        var result = super.needOperators(parsedCategory);
        return result.concat(['is', ':in', '~']);
    }

    //override to custom to indicate you want to show your custom date time
    needValues(parsedCategory: string, parsedOperator: string): any[] {
        if (parsedOperator == "is") {
            return ['null', 'not-null']
        }

        if (parsedOperator === ':in'){
            return ['[val1,val2]']
        }

        return super.needValues(parsedCategory, parsedOperator);
    }
}
