"use client"

import {FC, useMemo} from "react";
import {Textarea, TextAreaProps} from "@nextui-org/input";
import {UseFormRegister} from "react-hook-form";

type Props = {
    register?: UseFormRegister<any>,
} & TextAreaProps

const TextArea: FC<Props> = ({register, id, classNames, ...props}) => {
    const defAttributes: TextAreaProps = useMemo(() => ({
        id,
        color: "primary",
        size: "lg",
        classNames: {
            inputWrapper: "border border-primary/30 bg-primary/10 hover:!bg-primary/20",
            ...classNames
        },
        ...props
    }), [classNames, id, props])

    return register && id ? (
        <Textarea
            {...register(id, {required: props.required || props.isRequired})}
            {...defAttributes}
        />
    ) : <Textarea {...defAttributes} />
}

export default TextArea