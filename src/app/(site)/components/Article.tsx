"use client"

import {FC, PropsWithChildren} from "react";
import Title from "@/app/(site)/components/Title";
import {Divider} from "@nextui-org/react";
import Image from "@/app/(site)/components/Image";

type Props = {
    title: string,
    imageUrl?: string
} & PropsWithChildren

const Article: FC<Props> = ({children, title, imageUrl}) => {
    return (
        <article>
            <Title>{title}</Title>
            <Divider className="my-3"/>
            <div className="flex tablet:flex-col tablet:items-center gap-2">
                {imageUrl && (<Image
                    className="shrink-0"
                    fadeIn
                    imgWidth={300}
                    imgHeight={300}
                    src={imageUrl}
                    alt="Article Image"
                />)}
                <p className="text-justify max-w-xl">
                    {children}
                </p>
            </div>
        </article>
    )
}

export default Article