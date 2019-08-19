/*
 * Grammar
 * ==========================
 *
 * Accepts expressions like: nha == nhat AND (nhat == nha or "nhat " contains "tt") OR nhat == "test"
 */

{
  var parseTrace = options.parseTrace;
}

Expression
  = _ head:Condition tail:(ws ("AND"i / "OR"i) ws Condition)* _ {
      var result = [head]

      for (var i = 0; i < tail.length; i++) {
        var current = tail[i][3];
        current.conditionType = tail[i][1];
        result.push(current);
      }

      return result;
    }

Condition
  = "(" _ expr:Expression _ ")"
  		{
        	return {expressions:expr};
        }
  / (IsNullCondition / NotNullCondition / ThreeFactorCondition)

ThreeFactorCondition
  = category:ValidName ws operator:Operator ws value:ValidValue?
  			{
            	return {
                	category : category,
                    operator: operator,
                    value: value
                };
            }

IsNullCondition
  = category:ValidName ws isnull:IsNull
  			{
            	return {
                	category : category,
                    isnull: isnull
                };
            }

NotNullCondition
  = category:ValidName ws notnull:NotNull
  			{
            	return {
                	category : category,
                    notnull: notnull
                };
            }

Operator "operator"
  = ValidToken+  { parseTrace.pushOperator(text()); return text(); }


ValidValue "value"
  = ValidToken+ { parseTrace.pushValue(text() ); return text(); }
  /"\"" name:[^\"]* "\"" {
        var value = name.join("");
        parseTrace.pushValue(value);
        return value;
      }
ValidName  "category"
  = ValidToken+ { parseTrace.pushCategory(text() ); return text(); }
  /"\"" name:[^\"]* "\"" {
        var value = name.join("");
        parseTrace.pushCategory(value);
        return value;
      }
ValidToken
  = [^ \(\)\"\t\n\r]

ws "whitespace"
  = [ \t\n\r]+

_ "whitespace"
  = [ \t\n\r]*

IsNull "isnull"
  = "is_null"i

NotNull "notnull"
  = "is_not_null"i