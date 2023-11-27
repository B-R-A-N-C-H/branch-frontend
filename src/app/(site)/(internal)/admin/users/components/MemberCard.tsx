"use client"

import {FC, Fragment, useState} from "react";
import {Avatar, Card, CardBody, Chip} from "@nextui-org/react";
import Member from "@/app/utils/types/models/member";
import {useSession} from "next-auth/react";
import MemberModal from "@/app/(site)/(internal)/admin/users/components/MemberModal";

type Props = {
    member: Member
}

const MemberCard: FC<Props> = ({member}) => {
    const {data: session} = useSession()
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <Fragment>
            <MemberModal
                member={member}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
            <Card
                isPressable
                onPress={() => setModalOpen(true)}
                className="bg-secondary transition-fast cursor-pointer hover:scale-105"
            >
                <CardBody>
                    <div className="flex gap-4">
                        <Avatar isBordered color="primary" className="self-center"/>
                        <div className="self-center">
                            <p className="capitalize font-semibold text-white self-center">
                                {member.firstName.toLowerCase()} {member.lastName.toLowerCase()}{(session?.user.id === member.id) && (
                                <Chip
                                    size="sm"
                                    color="primary"
                                    className="ml-2"
                                    classNames={{
                                        content: "font-semibold"
                                    }}
                                    variant="flat"
                                >YOU</Chip>
                            )}
                                {member.role && (
                                    <Chip
                                        color="primary"
                                        className="ml-4 font-semibold"
                                        classNames={{
                                            content: "font-semibold"
                                        }}
                                    >{member.role.replaceAll("_", " ")}</Chip>
                                )}
                            </p>
                            <p className="text-sm text-white">{member.email}</p>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Fragment>

    )
}

export default MemberCard