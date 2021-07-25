import React, { useCallback} from "react";

export default function useFormValidation (validationFunc) {
    const [input, setInput] = React.useState('');
    const [wasFocus, setWasFocus] = React.useState(false);

    const validInput = validationFunc(input);

    const isValid = wasFocus ? validationFunc(input) : true 

    const onChangeText = useCallback( (event) => {
        console.log(event, "EVENTT IN FORMMM")
        const value = event.target?.value ? event.target.value : event
        setInput(value)
        setWasFocus(false)
    })

    const onBlurInput = useCallback( () => {
        setWasFocus(true)
    })


    return {
        onBlurInput,
        isValid,
        onChangeText,
        input
    }

}