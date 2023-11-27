"use client"

import {Button, Card, CardBody, Spacer} from "@nextui-org/react";
import RoundedFilledArrowIcon from "@/app/(site)/components/icons/RoundedFilledArrowIcon";
import GraduationCapIcon from "@/app/(site)/components/icons/GraduationCapIcon";
import ChatBubbleIcon from "@/app/(site)/components/icons/ChatBubbleIcon";
import Article from "@/app/(site)/components/Article";
import {Fragment, useRef} from "react";

export default function Home() {
    const aboutRef = useRef<HTMLDivElement>(null)

    return (
        <main>
            {/*Hero*/}
            <section
                className="h-fit pt-32 pb-16 px-16 phone:px-4"
                style={{
                    backgroundImage: 'url("/assets/hero-bg.jpg")'
                }}
            >
                <Card
                    isBlurred={false}
                    className="bg-white/10 text-white rounded-full backdrop-blur-md tablet:rounded-3xl p-2 w-fit phone:w-full phone:text-sm tablet:w-1/2 tracking-wide"
                >
                    <CardBody>
                        Nurturing Education Through Seamless Registration and Dynamic Communication
                    </CardBody>
                </Card>
                <Spacer y={6}/>
                <h1 className="text-8xl tablet:text-7xl phone:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-primary">BRANCH</h1>
                <h3 className="text-white text-2xl tablet:text-lg phone:text-medium font-semibold">The Basic
                    Schools&apos; Registration
                    Administration and Communications Hub</h3>
                <Spacer y={6}/>
                <Button
                    className="font-semibold bg-white rounded-full hover:scale-105 w-fit"
                    size="lg"
                    endContent={<RoundedFilledArrowIcon/>}
                    onPress={() => aboutRef.current?.scrollIntoView({
                        behavior: "smooth"
                    })}
                >
                    Explore BRANCH
                </Button>
                <Spacer y={24}/>
                <div className="flex tablet:flex-col gap-8">
                    <div
                        className="flex gap-4 text-white py-5 px-3 bg-white/10 backdrop-blur-md rounded-2xl max-w-sm">
                        <div
                            className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full self-center flex justify-center items-center">
                            <GraduationCapIcon width={28}/>
                        </div>
                        <p className="self-center font-light grow-0 max-w-[75%] text-sm">Effortlessly register students
                            online,
                            reducing the need
                            for physical visits and enhancing administrative efficiency.</p>
                    </div>
                    <div
                        className="flex gap-4 text-white py-5 px-3 bg-white/10 backdrop-blur-md rounded-2xl max-w-sm">
                        <div
                            className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full self-center flex justify-center items-center">
                            <ChatBubbleIcon width={28}/>
                        </div>
                        <p className="self-center font-light grow-0 max-w-[75%] text-sm">Facilitate seamless
                            communication
                            between teachers and parents through email, noticeboard postings, and blog updates, ensuring
                            timely and transparent information exchange.</p>
                    </div>
                </div>
            </section>
            <section
                ref={aboutRef}
                id="about"
                className="py-16 mx-auto max-w-[50%] phone:max-w-[80%] laptop:max-w-[75%] space-y-12"
            >
                <Article title="About BRANCH" imageUrl="/assets/student-studying.svg">
                    B.R.A.N.C.H, which stands for Basic Schools’ Registration Administration and Communications
                    Hub, is a cutting-edge web-based application designed to revolutionize the administrative
                    processes within educational institutions. Born out of a vision to streamline registration
                    procedures, enhance communication channels, and modernize data management, B.R.A.N.C.H
                    addresses the evolving needs of teachers, parents, and students alike. This platform serves
                    as a comprehensive solution, seamlessly transitioning educational establishments from
                    traditional paper-based record-keeping to a digital system. With a commitment to quality,
                    flexibility, and adaptability, B.R.A.N.C.H empowers administrators with tools to efficiently
                    manage registration periods, control user permissions, and retrieve critical student and
                    staff information with ease. B.R.A.N.C.H represents a technological leap forward in
                    education administration, fostering a dynamic and collaborative environment for all
                    stakeholders in the learning process.
                </Article>
                <Article title="Registration" imageUrl="/assets/student-registration.svg">

                    The registration process within the B.R.A.N.C.H system is a user-friendly and streamlined
                    experience, eliminating the need for physical visits and paperwork. Administrators can effortlessly
                    define, open, and close registration periods based on academic schedules, providing flexibility and
                    control over enrollment timelines. Through the intuitive interface, parents and students can easily
                    input necessary information, ensuring a smooth transition from paper-based to digital data
                    management. The system&apos;s adaptability accommodates diverse registration requirements, and with
                    the
                    click of a button, users with the appropriate permissions can initiate or conclude registration
                    cycles. This digitized process not only enhances efficiency but also contributes to a more organized
                    and responsive educational ecosystem.
                </Article>
                <Article title="Communication" imageUrl="/assets/megaphone.svg">
                    The communications process within the B.R.A.N.C.H system is designed to foster seamless and
                    transparent interactions between teachers, parents, and students. Through integrated features like
                    email, noticeboard postings, and blog updates, B.R.A.N.C.H ensures that important information is
                    effectively disseminated. Teachers can easily communicate class updates, announcements, and academic
                    progress to parents, fostering a collaborative educational environment. Likewise, parents can
                    receive timely information, engage in discussions, and stay informed about their child&apos;s
                    educational
                    journey. The system&apos;s commitment to effective communication extends to blog posts, providing a
                    platform for sharing valuable insights and updates. By facilitating these diverse communication
                    channels, B.R.A.N.C.H aims to strengthen the vital partnership between educators and parents,
                    contributing to a more engaged and supportive learning community.
                </Article>
            </section>
        </main>
    )
}
