import React from "react";
import Input from "../UI/Input/Input";

export const createQueryFormFromSchema = (schema, errorHandler, registerHandler) => {
    const formElementArray = createArrayWithKey(schema);

    return formElementArray.map((element) => {
        return (
            <Input
                formReference={registerHandler(element.config.rules)}
                key={element.id}
                label={element.id}
                elementType={element.config.elementType}
                error={errorHandler[element.id]}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
            />
        );
    });
}

const createArrayWithKey = (schema) => {
    const formElementArray = [];
    for (let key in schema) {
        formElementArray.push({
            id: key,
            config: schema[key],
        });
    }
    return formElementArray;
}